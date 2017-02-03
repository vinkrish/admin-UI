import { Routes }                   from '@angular/router';
import { SliptestComponent } 	    from './sliptest.component';
import { SliptestEditComponent }    from './sliptest-edit.component';
import { LoggedInGuard }            from '../../login/logged-in.guard';

export const sliptestRoutes: Routes = [
    {
        path: 'sliptest',
        component: SliptestComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'sliptest/edit/:id',
        component: SliptestEditComponent,
        canActivate: [LoggedInGuard]
   } 
];
