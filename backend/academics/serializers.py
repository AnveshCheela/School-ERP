from rest_framework import serializers
from .models import SchoolClass, Student, Teacher, Attendance, Marks
from accounts.serializers import UserSerializer

class SchoolClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolClass
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    school_class = SchoolClassSerializer(read_only=True)
    
    class Meta:
        model = Student
        fields = '__all__'

class TeacherSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    assigned_class = SchoolClassSerializer(read_only=True)

    class Meta:
        model = Teacher
        fields = '__all__'

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'

class AttendanceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ['student', 'date', 'present']

class MarksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marks
        fields = '__all__'

class MarksCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marks
        fields = ['student', 'subject', 'score']
