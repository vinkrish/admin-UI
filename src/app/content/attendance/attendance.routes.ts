import { Routes }         		from '@angular/router';
import { AttendanceComponent }	from './attendance.component';
import { LoggedInGuard }        from '../../login/logged-in.guard';

export const attendanceRoutes: Routes = [
  {
    path: 'attendance',
    component: AttendanceComponent,
    canActivate: [LoggedInGuard]
  }
];