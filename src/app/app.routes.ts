import { RouterModule, Routes }         from '@angular/router';
import { ModuleWithProviders }          from '@angular/core';
import { LoggedInGuard }                from './login/logged-in.guard';
import { LoginComponent }               from './login/credentials.component';
import { DashboardComponent }           from './dashboard/dashboard.component';
import { ExamDashboardComponent }       from './exam-dashboard/exam-dashboard.component';
import { CceDashboardComponent }        from './cce-dashboard/cce-dashboard.component';
import { dashboardRoutes }              from './dashboard/dashboard.routes';
import { examDashboardRoutes }          from './exam-dashboard/exam-dashboard.routes';
import { cceDashboardRoutes }           from './cce-dashboard/cce-dashboard.routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'exam-dashboard',
    component: ExamDashboardComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'cce-dashboard',
    component: CceDashboardComponent,
    canActivate: [LoggedInGuard]
  },
  ...dashboardRoutes,
  ...examDashboardRoutes,
  ...cceDashboardRoutes
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);