import { Routes }               from '@angular/router';
import { ExamComponent }        from './exam.component';
import { ExamEditComponent }    from './exam-edit.component';
import { LoggedInGuard }        from '../../login/logged-in.guard';

export const examRoutes: Routes = [
  {
    path: 'exam',
    component: ExamComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'exam/edit/:id',
    component: ExamEditComponent,
    canActivate: [LoggedInGuard]
  }
];