import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudentService } from '../../../core/services/student.service';

interface AttendanceRecord {
  date: string;
  status: 'Present' | 'Absent';
  remarks?: string;
}

@Component({
  selector: 'app-attendance-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './attendance-history.html',
})
export class AttendanceHistoryComponent implements OnInit {
  private studentService = inject(StudentService);
  
  // Mock data for immediate testing since JWT auth isn't hooked up yet
  records: AttendanceRecord[] = [];
  
  mockRecords: AttendanceRecord[] = [
    { date: '2026-08-08', status: 'Present' },
    { date: '2026-08-09', status: 'Present' },
    { date: '2026-08-10', status: 'Absent', remarks: 'Family Event' },
    { date: '2026-08-11', status: 'Present' },
    { date: '2026-08-12', status: 'Present' },
  ];

  totalDays = 0;
  presentDays = 0;
  absentDays = 0;
  attendancePercentage = 0;
  currentFilter: 'All' | 'Present' | 'Absent' = 'All';

  get filteredRecords(): AttendanceRecord[] {
    if (this.currentFilter === 'All') return this.records;
    return this.records.filter(r => r.status === this.currentFilter);
  }

  setFilter(filter: 'All' | 'Present' | 'Absent') {
    this.currentFilter = filter;
  }

  ngOnInit(): void {
    this.studentService.getAttendance().subscribe({
      next: (data) => {
        if (data && data.history) {
           this.records = data.history;
        } else {
           this.records = this.mockRecords;
        }
        this.calculateStats();
      },
      error: (err) => {
        console.error('Error fetching attendance history', err);
        this.records = this.mockRecords;
        this.calculateStats();
      }
    });
  }

  calculateStats() {
    this.totalDays = this.records.length;
    this.presentDays = this.records.filter(r => r.status === 'Present').length;
    this.absentDays = this.records.filter(r => r.status === 'Absent').length;
    this.attendancePercentage = this.totalDays === 0 ? 0 : Math.round((this.presentDays / this.totalDays) * 100);
  }
}
