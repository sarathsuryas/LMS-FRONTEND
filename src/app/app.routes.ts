import { Routes } from '@angular/router';
import { userGuard } from './guards/user.guard';
import { adminGuard } from './guards/admin.guard';

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
        loadComponent:()=> import('./user/pages/user-home/user-home.component').then(c=>c.UserHomeComponent),
        canActivateChild: [userGuard],
        children:[
            {
                path:'books',
                loadComponent:()=> import('./user/components/book-table/book-table.component').then(c=>c.BookTableComponent)
            },
            {
                path:'transaction',
                loadComponent:()=> import('./user/components/book-history-table/book-history-table.component').then(c=>c.BookHistoryTableComponent)
            },
            {
                path:'profile',
                loadComponent:()=> import('./user/pages/user-profile/user-profile.component').then(c=>c.UserProfileComponent)
            }
        ]
    },
    {
        path:'admin/home',
        loadComponent:()=> import('./admin/pages/admin-home/admin-home.component').then(c=>c.AdminHomeComponent),
        canActivateChild: [adminGuard],
        children:[
            {
            path:'dashboard',
            loadComponent:()=> import('./admin/components/dashboard-table/dashboard-table.component').then(c=>c.DashboardTableComponent)
            },
            {
                 path:'history',
                 loadComponent:()=> import('./admin/components/transaction-table/transaction-table.component').then(c=>c.TransactionTableComponent)   
            },
            {
                path:'profile',
                loadComponent:()=> import('./admin/pages/admin-profile/admin-profile.component').then(c=>c.AdminProfileComponent)
            }
        ]
    },
];
