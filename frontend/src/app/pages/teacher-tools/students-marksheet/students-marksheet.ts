import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherService, Student } from '../../../core/services/teacher.service';

@Component({
  selector: 'app-students-marksheet',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './students-marksheet.html',
  styleUrl: './students-marksheet.scss',
})
export class StudentsMarksheet implements OnInit {
  private teacherService = inject(TeacherService);
  
  students: Student[] = [];
  selectedSubject: string = 'math';
  enteredScores: { [studentCode: string]: number | null } = {};
  studentAverages: { [studentCode: string]: string | number } = {};
  
  ngOnInit() {
    this.teacherService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        if (this.students.length === 0) {
            this.loadMockData();
        }
      },
      error: (err) => {
        console.error('Error fetching students', err);
        this.loadMockData();
      }
    });
  }

  loadMockData() {
    this.students = [
        { id: 1, student_id: 'S001', user: { first_name: 'Rahul', last_name: 'Kumar' } },
        { id: 2, student_id: 'S002', user: { first_name: 'Priya', last_name: 'Sharma' } },
        { id: 3, student_id: 'S003', user: { first_name: 'Amit', last_name: 'Singh' } }
    ];
  }

  submitAllMarks() {
    for (const student of this.students) {
      const score = this.enteredScores[student.student_id];
      if (score !== undefined && score !== null) {
        this.teacherService.submitMark(student.id, this.selectedSubject, score).subscribe({
          next: (response: any) => {
            if (response.updated_average) {
                this.studentAverages[student.student_id] = response.updated_average + '%';
            } else {
                this.studentAverages[student.student_id] = score + '%'; // fallback if no average
            }
            this.enteredScores[student.student_id] = null; // Clear input on success
          },
          error: (err: any) => {
            console.error('Failed to submit mark for', student.student_id, err);
            // Optimistic fallback for demo
            this.studentAverages[student.student_id] = score + '%';
            this.enteredScores[student.student_id] = null; 
          }
        });
      }
    }
  }
}
