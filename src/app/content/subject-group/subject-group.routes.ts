import { Routes }         		          from '@angular/router';
import { SubjectGroupComponent } 		    from './subject-group.component';
import { SubjectGroupEditComponent } 	  from './subject-group-edit.component';
import { LoggedInGuard }        		    from '../../login/logged-in.guard';

export const subjectGroupRoutes: Routes = [
  {
    path: 'subject-group',
    component: SubjectGroupComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'subject-group/edit/:id',
    component: SubjectGroupEditComponent,
    canActivate: [LoggedInGuard]
  }
];
