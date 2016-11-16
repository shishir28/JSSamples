import { Routes } from '@angular/router';

import { LoginRoutes } from './components/login/index';
import { DashboardRoutes } from './components/dashboard/index';

import { LoginComponent } from './components/login/index';

export const routes: Routes = [
    ...LoginRoutes,
    ...DashboardRoutes,
    { path: '**', component: LoginComponent }
];
