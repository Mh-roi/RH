import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { 
        path: 'home', 
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
        loadChildren: () => import('./components/home/home.routes').then(m => m.default)
    },
    { 
        path: 'login', 
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) 
    },
];
