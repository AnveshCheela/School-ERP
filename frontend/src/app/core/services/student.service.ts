import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8000/api';

  getAttendance(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/student/attendance/`);
  }

  getClassRankings(classId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/class/${classId}/rankings/`);
  }
}
