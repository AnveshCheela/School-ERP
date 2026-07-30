import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudentService } from '../../../core/services/student.service';

interface ClassRanking {
  student_id: string;
  student_name: string;
  average: number;
  total_subjects: number;
  rank: number;
}

@Component({
  selector: 'app-student-marks',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-marks.html',
})
export class StudentMarksComponent implements OnInit {
  private studentService = inject(StudentService);

  rankings: ClassRanking[] = [];
  
  // Mock data for immediate testing since JWT auth isn't hooked up yet
  mockRankings: ClassRanking[] = [
    { student_id: 'S001', student_name: 'Alice Johnson', average: 95.5, total_subjects: 5, rank: 1 },
    { student_id: 'S002', student_name: 'Bob Smith', average: 92.0, total_subjects: 5, rank: 2 },
    { student_id: 'S003', student_name: 'Kiran Sai', average: 88.5, total_subjects: 5, rank: 3 },
    { student_id: 'S004', student_name: 'David Lee', average: 85.0, total_subjects: 5, rank: 4 },
    { student_id: 'S005', student_name: 'Eve Davis', average: 82.5, total_subjects: 5, rank: 5 },
  ];

  myStudentId = 'S003'; // Mock logged-in student
  myRanking: ClassRanking | undefined;
  
  exams = ['FA-I', 'FA-II', 'FA-III', 'FA-IV', 'SA-I', 'SA-II'];
  selectedExam = 'SA-I';

  ngOnInit(): void {
    this.studentService.getClassRankings(1).subscribe({
      next: (data) => {
        if (data && data.rankings) {
          this.rankings = data.rankings;
        } else {
          this.rankings = this.mockRankings;
        }
        this.myRanking = this.rankings.find(r => r.student_id === this.myStudentId);
      },
      error: (err) => {
        console.error('Error fetching rankings', err);
        this.rankings = this.mockRankings;
        this.myRanking = this.rankings.find(r => r.student_id === this.myStudentId);
      }
    });
  }

  selectExam(exam: string) {
    this.selectedExam = exam;
    // In a real app, this would trigger a new API call to fetch rankings for the selected exam.
  }
}
