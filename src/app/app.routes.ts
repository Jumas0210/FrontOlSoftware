import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: ()=>
            import('./pages/login/login.component').then((c) => c.LoginComponent),
    },
    {
        path: 'dashboard',
        loadChildren: () =>
           import('./pages/dashboard/dashboard.routes').then((r) => r.routes),
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];