import { Routes }         from '@angular/router';
import { SectionComponent } 	from './section.component';
import { SectionEditComponent } from './section-edit.component';
import { LoggedInGuard }        from '../../login/logged-in.guard';

export const sectionRoutes: Routes = [
    {
    path: 'section',
    component: SectionComponent,
    canActivate: [LoggedInGuard]
  },
    {
    path: 'section/edit/:id',
    component: SectionEditComponent,
    canActivate: [LoggedInGuard]
  }
];
