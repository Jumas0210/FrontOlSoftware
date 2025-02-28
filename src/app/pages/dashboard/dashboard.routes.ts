import { Routes } from "@angular/router";

export const routes: Routes =[
    {
        path:'list',
        loadComponent: () => 
            import('./pages/list/list.component').then((c) => c.ListComponent),
    },
    {
        path:'form',
        loadComponent: () =>
            import('./pages/form/form.component').then((c) => c.FormComponent),
    },
    {
        path:'',
        redirectTo : 'list',
        pathMatch: 'full'
    }
]