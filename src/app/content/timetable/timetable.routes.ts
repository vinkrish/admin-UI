import { Routes }         		from '@angular/router';
import { TimetableComponent } 	from './timetable.component';
import { LoggedInGuard }        from '../../login/logged-in.guard';

export const timetableRoutes: Routes = [
  {
    path: 'timetable',
    component: TimetableComponent,
    canActivate: [LoggedInGuard]
  }
];