from django.core.management.base import BaseCommand
from accounts.models import User
from academics.models import SchoolClass, Student, Teacher, Attendance, Marks
from datetime import date

class Command(BaseCommand):
    help = 'Seeds the database with initial data'

    def handle(self, *args, **kwargs):
        school_class, created = SchoolClass.objects.get_or_create(name='10A')

        teacher_user, created = User.objects.get_or_create(
            username='teacher1',
            defaults={'role': User.Role.TEACHER, 'first_name': 'John', 'last_name': 'Doe'}
        )
        if created:
            teacher_user.set_password('teacher123')
            teacher_user.save()
            Teacher.objects.create(user=teacher_user, teacher_id='T001', assigned_class=school_class)

        for i in range(1, 6):
            student_username = f'student{i}'
            student_user, created = User.objects.get_or_create(
                username=student_username,
                defaults={'role': User.Role.STUDENT, 'first_name': f'Student{i}', 'last_name': 'Last'}
            )
            if created:
                student_user.set_password('student123')
                student_user.save()
                student = Student.objects.create(
                    user=student_user,
                    student_id=f'S100{i}',
                    school_class=school_class
                )
                
                Attendance.objects.create(
                    student=student,
                    date=date.today(),
                    present=True,
                    marked_by=teacher_user.teacher if hasattr(teacher_user, 'teacher') else None
                )
                
                Marks.objects.create(
                    student=student,
                    subject='Math',
                    score=85.0 + i,
                    submitted_by=teacher_user.teacher if hasattr(teacher_user, 'teacher') else None
                )

        self.stdout.write(self.style.SUCCESS('Successfully seeded database.'))
