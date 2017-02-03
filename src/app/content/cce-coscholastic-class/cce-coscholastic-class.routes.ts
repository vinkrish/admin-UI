import { Routes }         					from '@angular/router';
import { CceCoschClassComponent } 			from './cce-coscholastic-class.component';
import { LoggedInGuard }        			from '../../login/logged-in.guard';

export const cceCoschClassRoutes: Routes = [
   {
    path: 'cce-coscholastic-class',
    component: CceCoschClassComponent,
    canActivate: [LoggedInGuard]
  }
];
