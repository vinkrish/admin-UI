import { Routes }                  from '@angular/router';
import { TeacherComponent }        from './teacher.component';
import { TeacherEditComponent }    from './teacher-edit.component';
import { LoggedInGuard }           from '../../login/logged-in.guard';

export const teacherRoutes: Routes = [
  {
    path: 'teacher',
    component: TeacherComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'teacher/edit/:id',
    component: TeacherEditComponent,
    canActivate: [LoggedInGuard]
  }
];
