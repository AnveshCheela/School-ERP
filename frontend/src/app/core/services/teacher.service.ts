import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
  id: number;
  student_id: string;
  user: {
    first_name: string;
    last_name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api'; // Assuming default django port

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/teacher/students/`);
  }

  markAttendance(studentId: number, date: string, present: boolean): Observable<any> {
    return this.http.post(`${this.apiUrl}/teacher/attendance/`, {
      student: studentId,
      date: date,
      present: present
    });
  }

  submitMark(studentId: number, subject: string, score: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/teacher/marks/`, {
      student: studentId,
      subject: subject,
      score: score
    });
  }
}