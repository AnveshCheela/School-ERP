import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { StudentLogin } from './pages/auth/student-login/student-login';
import { TeacherLogin } from './pages/auth/teacher-login/teacher-login';
import { ManagementLogin } from './pages/auth/management-login/management-login';
import { StudentDashboard } from './pages/dashboards/student-dashboard/student-dashboard';
import { TeacherDashboard } from './pages/dashboards/teacher-dashboard/teacher-dashboard';
import { StudentAttendance } from './pages/teacher-tools/student-attendance/student-attendance';
import { StudentsMarksheet } from './pages/teacher-tools/students-marksheet/students-marksheet';
import { SuperadminDashboard } from './pages/dashboards/superadmin-dashboard/superadmin-dashboard';
import { AccountantDashboard } from './pages/dashboards/accountant-dashboard/accountant-dashboard';
import { AttendanceHistoryComponent } from './pages/student-tools/attendance-history/attendance-history';
import { StudentMarksComponent } from './pages/student-tools/student-marks/student-marks';
import { teacherGuard, studentGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'login/student', component: StudentLogin },
  { path: 'login/teacher', component: TeacherLogin },
  { path: 'login/management', component: ManagementLogin },
  { path: 'dashboard/student', component: StudentDashboard, canActivate: [studentGuard] },
  { path: 'dashboard/teacher', component: TeacherDashboard, canActivate: [teacherGuard] },
  { path: 'dashboard/superadmin', component: SuperadminDashboard },
  { path: 'dashboard/accountant', component: AccountantDashboard },
  { path: 'student-tools/attendance', component: AttendanceHistoryComponent, canActivate: [studentGuard] },
  { path: 'student-tools/marks', component: StudentMarksComponent, canActivate: [studentGuard] },
  { path: 'tools/attendance', component: StudentAttendance, canActivate: [teacherGuard] },
  { path: 'tools/marksheet', component: StudentsMarksheet, canActivate: [teacherGuard] },
  { path: '**', redirectTo: '' }
];
