import { Routes } from "@angular/router";

export default [
    {
        path: 'compte',
        loadChildren: () => import('../compte/compte.routes').then(m => m.default)
    }
] as Routes;