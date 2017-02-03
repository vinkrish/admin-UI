import { Routes }         		from '@angular/router';
import { HomeworkComponent } 	from './homework.component';
import { LoggedInGuard }        from '../../login/logged-in.guard';

export const homeworkRoutes: Routes = [
  {
    path: 'homework',
    component: HomeworkComponent,
    canActivate: [LoggedInGuard]
  }
];
