import { Routes }               from '@angular/router';
import { SchoolComponent }      from './school.component';
import { SchoolEditComponent }  from './school-edit.component';
import { LoggedInGuard }        from '../login/logged-in.guard';

export const schoolRoutes: Routes = [
   {
    path: 'school',
    component: SchoolComponent,
    canActivate: [LoggedInGuard]
  },
   {
    path: 'school/edit/:id',
    component: SchoolEditComponent,
    canActivate: [LoggedInGuard]
  }
];
