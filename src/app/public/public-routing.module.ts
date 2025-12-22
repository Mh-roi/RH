import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPublicComponent } from './dashboard-public.component';

const routes: Routes = [
  { path: '', component: DashboardPublicComponent },
  { path: 'activation', data: {breadcrumb: 'Gestion des activations'}, loadChildren: () => import('../public/activation-compte/activation-compte.module').then(m => m.ActivationCompteModule) },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
