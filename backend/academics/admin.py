from django.contrib import admin
from .models import SchoolClass, Student, Teacher, Attendance, Marks

admin.site.register(SchoolClass)
admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(Attendance)
admin.site.register(Marks)
