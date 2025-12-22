import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrhHomeComponent } from './drh-home/drh-home.component';

const routes: Routes = [
  
  { path: '', data: {breadcrumb: 'Tableau de bord DRH'}, component: DrhHomeComponent },
  { path: 'mes-agents', data: {breadcrumb: 'Mes agents'}, loadChildren: () => import('../mes-agents/mes-agents.module').then(m => m.MesAgentsModule) },

  { path: 'mes-activites', data: {breadcrumb: 'Gestion des activites'}, loadChildren: () => import('../activite/activite.module').then(m => m.ActiviteModule) },
  { path: 'mes-notes', data: {breadcrumb: 'Liste des notes'}, loadChildren: () => import('../administration/parametre/mes-notes/mes-notes.module').then(m => m.MesNotesModule) },
  { path: 'notes-agents', data: {breadcrumb: 'Notes de mes agents'}, loadChildren: () => import('../administration/parametre/notes-agents/notes-agents.module').then(m => m.NotesAgentsModule) },
  { path: 'fiches-poste', data: {breadcrumb: 'Liste des fiches de postes'}, loadChildren: () => import('../administration/parametre/fiches-poste/fiches-poste.module').then(m => m.FichesPosteModule) },
  { path: 'fonctionnaire', data: {breadcrumb: 'Gestion  des fonctionnaires'}, loadChildren: () => import('../administration/parametre/fonctionnaire/fonctionnaire.module').then(m => m.FonctionnaireModule) },
  { path: 'codes', data: {breadcrumb: 'Affichage du code'}, loadChildren: () => import('../administration/parametre/code/code.module').then(m => m.CodeModule) },
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrhRoutingModule { }
