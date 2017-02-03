import { Routes }             		from '@angular/router';
import { SubjectStudentComponent }  from './subject-student.component';
import { LoggedInGuard }            from '../../login/logged-in.guard';

export const subjectStudentRoutes: Routes = [
   {
    path: 'subject-student',
    component: SubjectStudentComponent,
    canActivate: [LoggedInGuard]
  }
];
