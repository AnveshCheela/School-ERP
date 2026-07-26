from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
import logging

from accounts.permissions import IsTeacher, IsStudent
from .models import Student, Attendance, Marks, SchoolClass
from .serializers import (
    StudentSerializer, AttendanceSerializer, AttendanceCreateSerializer,
    MarksSerializer, MarksCreateSerializer
)
from grpc_client.client import submit_marks, get_class_rankings

logger = logging.getLogger(__name__)

class TeacherStudentListView(generics.ListAPIView):
    serializer_class = StudentSerializer
    permission_classes = [IsTeacher]

    def get_queryset(self):
        teacher = self.request.user.teacher
        if teacher.assigned_class:
            return Student.objects.filter(school_class=teacher.assigned_class)
        return Student.objects.none()

class TeacherAttendanceView(APIView):
    permission_classes = [IsTeacher]

    def post(self, request):
        serializer = AttendanceCreateSerializer(data=request.data)
        if serializer.is_valid():
            attendance = serializer.save(marked_by=request.user.teacher)
            return Response(AttendanceSerializer(attendance).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TeacherMarksView(APIView):
    permission_classes = [IsTeacher]

    def post(self, request):
        serializer = MarksCreateSerializer(data=request.data)
        if serializer.is_valid():
            marks = serializer.save(submitted_by=request.user.teacher)
            
            # Call gRPC submit_marks
            grpc_error = None
            try:
                submit_marks(
                    student_id=marks.student.student_id,
                    student_name=f"{marks.student.user.first_name} {marks.student.user.last_name}",
                    class_id=marks.student.school_class.id,
                    subject=marks.subject,
                    score=marks.score
                )
            except Exception as e:
                logger.error(f"gRPC SubmitMarks failed: {e}")
                grpc_error = str(e)

            data = MarksSerializer(marks).data
            if grpc_error:
                data['grpc_warning'] = "Marks saved locally, but gRPC submission failed."
                
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ClassRankingsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, class_id):
        # Call gRPC get_class_rankings
        try:
            responses = get_class_rankings(class_id)
            rankings = []
            for resp in responses:
                rankings.append({
                    "student_id": resp.student_id,
                    "student_name": resp.student_name,
                    "average": resp.average,
                    "total_subjects": resp.total_subjects,
                    "rank": resp.rank
                })
            return Response(rankings)
        except Exception as e:
            logger.error(f"gRPC StreamClassRankings failed: {e}")
            return Response({"error": "Grading service unavailable"}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

class StudentAttendanceView(generics.ListAPIView):
    serializer_class = AttendanceSerializer
    permission_classes = [IsStudent]

    def get_queryset(self):
        return Attendance.objects.filter(student__user=self.request.user)
