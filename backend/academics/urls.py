from django.urls import path
from .views import (
    TeacherStudentListView,
    TeacherAttendanceView,
    TeacherMarksView,
    ClassRankingsView,
    StudentAttendanceView
)

urlpatterns = [
    path('teacher/students/', TeacherStudentListView.as_view(), name='teacher_students'),
    path('teacher/attendance/', TeacherAttendanceView.as_view(), name='teacher_attendance'),
    path('teacher/marks/', TeacherMarksView.as_view(), name='teacher_marks'),
    path('class/<int:class_id>/rankings/', ClassRankingsView.as_view(), name='class_rankings'),
    path('student/attendance/', StudentAttendanceView.as_view(), name='student_attendance'),
]
