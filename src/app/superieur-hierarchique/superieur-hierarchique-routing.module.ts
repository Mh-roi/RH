import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperieurHierarchiqueHomeComponent } from './superieur-hierarchique-home/superieur-hierarchique-home.component';

const routes: Routes = [
  { path: '', data: {breadcrumb: 'Tableau de bord Superieur hierarchique'}, component: SuperieurHierarchiqueHomeComponent },
  { path: 'mes-agents', data: {breadcrumb: 'Mes agents'}, loadChildren: () => import('../mes-agents/mes-agents.module').then(m => m.MesAgentsModule) },
  { path: 'mes-notes', data: {breadcrumb: 'Liste des notes'}, loadChildren: () => import('../administration/parametre/mes-notes/mes-notes.module').then(m => m.MesNotesModule) },
  { path: 'notes-agents', data: {breadcrumb: 'Notes de mes agents'}, loadChildren: () => import('../administration/parametre/notes-agents/notes-agents.module').then(m => m.NotesAgentsModule) },
    { path: 'apropos', data: {breadcrumb: 'Gestion des  Apropos'}, loadChildren: () => import('../administration/parametre/apropos/apropos.module').then(m => m.AproposModule)},

  // { path: 'mes-activites', data: {breadcrumb: 'Gestion des activites'}, loadChildren: () => import('../activite/activite.module').then(m => m.ActiviteModule) },
  // { path: 'proposer/:matricule', data: {breadcrumb: 'Gestion des activites'}, loadChildren: () => import('../attribuer-activite/attribuer-activite.module').then(m => m.AttribuerActiviteModule) },
  // { path: 'change-affiliation', data: {breadcrumb: 'Changer Affiliation'}, loadChildren: () => import('../administration/changer-affiliation/changer-affiliation.module').then(m => m.ChangerAffiliationModule) },
  // { path: 'mon-code', data: {breadcrumb: 'Affichage du code'}, loadChildren: () => import('../administration/parametre/code/code.module').then(m => m.CodeModule) },
  // { path: 'noteattribuer', data: {breadcrumb: 'Gestion des notes attribuer'}, loadChildren: () => import('../noteattribuer/noteattribuer.module').then(m => m.NoteattribuerModule) },
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperieurHierarchiqueRoutingModule { }
