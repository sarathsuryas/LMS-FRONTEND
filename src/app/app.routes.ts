import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'register',
        loadComponent:()=> import('./common/register/register.component').then(c=>c.RegisterComponent)
    },
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        loadComponent:()=> import('./user/pages/login/login.component').then(c=>c.LoginComponent)
    },
    {
        path:'admin',
        loadComponent:()=> import('./admin/pages/admin-login/admin-login.component').then(c=>c.AdminLoginComponent)
    },
    {
        path:'home',
        loadComponent:()=> import('./user/pages/user-home/user-home.component').then(c=>c.UserHomeComponent)
    },
    {
        path:'admin/home',
        loadComponent:()=> import('./admin/pages/admin-home/admin-home.component').then(c=>c.AdminHomeComponent),
        children:[
            {
            path:'dashboard',
            loadComponent:()=> import('./admin/components/dashboard-table/dashboard-table.component').then(c=>c.DashboardTableComponent)
            }
        ]
    },
];
