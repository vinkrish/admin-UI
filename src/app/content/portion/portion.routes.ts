import { Routes }               from '@angular/router';
import { PortionComponent } 	from './portion.component';
import { PortionEditComponent } from './portion-edit.component';
import { LoggedInGuard }        from '../../login/logged-in.guard';

export const portionRoutes: Routes = [
    {
        path: 'portion',
        component: PortionComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'portion/edit/:id',
        component: PortionEditComponent,
        canActivate: [LoggedInGuard]
   } 
];
