import { RouterLink } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherService, Student } from '../../../core/services/teacher.service';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './teacher-dashboard.html',
  styleUrl: './teacher-dashboard.scss',
})
export class TeacherDashboard implements OnInit {
  students: Student[] = [];
  teacherService = inject(TeacherService);

  ngOnInit() {
    this.teacherService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (err) => console.error('Failed to load students', err)
    });
  }
}
