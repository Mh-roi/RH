import { Routes } from "@angular/router";

export default [
    {
        path: 'liste',
        loadComponent: () => import('./liste-compte/liste-compte.component').then(m => m.ListeCompteComponent)
    },
    {
        path: 'create',
        loadComponent: () => import('./create-compte/create-compte.component').then(m => m.CreateCompteComponent)
    }
] as Routes;