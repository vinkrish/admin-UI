import { Routes }                   from '@angular/router';
import { CceCoschComponent }        from './cce-coscholastic.component';
import { CceCoschEditComponent }    from './cce-coscholastic-edit.component';
import { LoggedInGuard }            from '../../login/logged-in.guard';

export const cceCoscholasticRoutes: Routes = [
  {
    path: 'cce-coscholastic',
    component: CceCoschComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'cce-coscholastic/edit/:id',
    component: CceCoschEditComponent,
    canActivate: [LoggedInGuard]
  }
];