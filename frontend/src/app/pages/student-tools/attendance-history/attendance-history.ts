import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
  // Mock data for immediate testing since JWT auth isn't hooked up yet
  records: AttendanceRecord[] = [
    { date: '2026-08-01', status: 'Present' },
    { date: '2026-08-02', status: 'Present' },
    { date: '2026-08-03', status: 'Absent', remarks: 'Sick Leave' },
    { date: '2026-08-04', status: 'Present' },
    { date: '2026-08-05', status: 'Present' },
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
    this.totalDays = this.records.length;
    this.presentDays = this.records.filter(r => r.status === 'Present').length;
    this.absentDays = this.records.filter(r => r.status === 'Absent').length;
    this.attendancePercentage = this.totalDays === 0 ? 0 : Math.round((this.presentDays / this.totalDays) * 100);
  }
}
