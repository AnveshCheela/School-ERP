from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import LoginSerializer, UserSerializer
from .models import User

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'role': user.role,
        })

class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        data = UserSerializer(user).data
        if user.role == User.Role.STUDENT and hasattr(user, 'student'):
            data['student_id'] = user.student.student_id
            data['class'] = user.student.school_class.name
        elif user.role == User.Role.TEACHER and hasattr(user, 'teacher'):
            data['teacher_id'] = user.teacher.teacher_id
            data['assigned_class'] = user.teacher.assigned_class.name if user.teacher.assigned_class else None
        return Response(data)
