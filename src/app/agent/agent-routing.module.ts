import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentHomeComponent } from './agent-home/agent-home.component';

const routes: Routes = [
  { path: '', data: {breadcrumb: 'Tableau de bord Agent'}, component: AgentHomeComponent },
  { path: 'mes-notes', data: {breadcrumb: 'Liste des notes'}, loadChildren: () => import('../administration/parametre/mes-notes/mes-notes.module').then(m => m.MesNotesModule) },

  { path: 'apropos', data: {breadcrumb: 'Gestion des  Apropos'}, loadChildren: () => import('../administration/parametre/apropos/apropos.module').then(m => m.AproposModule)},
  // { path: 'mes-activites', data: {breadcrumb: 'Gestion des activites'}, loadChildren: () => import('../activite/activite.module').then(m => m.ActiviteModule) },
  // { path: 'change-affiliation', data: {breadcrumb: 'Changer Affiliation'}, loadChildren: () => import('../administration/changer-affiliation/changer-affiliation.module').then(m => m.ChangerAffiliationModule) },
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
