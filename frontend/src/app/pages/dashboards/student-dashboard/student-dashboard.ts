import { RouterLink } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../core/services/student.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.scss',
})
export class StudentDashboard implements OnInit {
  attendanceData: any;
  rankingData: any;
  studentService = inject(StudentService);

  ngOnInit() {
    this.studentService.getAttendance().subscribe({
      next: (data) => this.attendanceData = data,
      error: (err) => console.error('Failed to load attendance', err)
    });

    this.studentService.getClassRankings(1).subscribe({
      next: (data) => this.rankingData = data,
      error: (err) => console.error('Failed to load rankings', err)
    });
  }
}
