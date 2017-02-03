import { Routes }                from '@angular/router';
import { ClassComponent }        from './class.component';
import { ClassEditComponent }    from './class-edit.component';
import { LoggedInGuard }         from '../../login/logged-in.guard';

export const clasRoutes: Routes = [
  {
    path: 'class',
    component: ClassComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'class/edit/:id',
    component: ClassEditComponent,
    canActivate: [LoggedInGuard]
  }
];