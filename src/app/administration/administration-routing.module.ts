import { NgModule } from '@angular/core';

import { DashboardAdministrationComponent } from './dashboard-administration.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', data: {breadcrumb: 'Tableau de bord'}, component: DashboardAdministrationComponent },
  { path: 'compte', data: {breadcrumb: 'Gestion des utilisateurs'}, loadChildren: () => import('../account/user/user.module').then(m => m.UserModule) },
  { path: 'utilisateur/privilege', data: {breadcrumb: 'Gestion des privilèges'}, loadChildren: () => import('../account/privilege/privilege.module').then(m => m.PrivilegeModule) },
  { path: 'account/infos-user', loadChildren: () => import('../account/infos-user/infos-user.module').then(m => m.InfosUserModule) },
  { path: 'categorie', data: {breadcrumb: 'Gestion des catégories'}, loadChildren: () => import('./parametre/categorie/categorie.module').then(m => m.CategorieModule) },
  { path: 'outils', data: {breadcrumb: 'Outils Evaluation'}, loadChildren: () => import('./parametre/apropos/apropos.module').then(m => m.AproposModule)},
  { path: 'note', data: {breadcrumb: 'Liste des notes'}, loadChildren: () => import('../administration/parametre/mes-notes/mes-notes.module').then(m => m.MesNotesModule) },
  { path: 'ministere', data: {breadcrumb: 'Gestion des ministeres'}, loadChildren: () => import('./parametre/ministere/ministere.module').then(m => m.MinistereModule) }, 
  { path: 'structure', data: {breadcrumb: 'Gestion des structures'}, loadChildren: () => import('./parametre/structure/structure.module').then(m => m.StructureModule) },
  { path: 'periode', data: {breadcrumb: 'Gestion des periodes'}, loadChildren: () => import('./parametre/period/period.module').then(m => m.PeriodModule) },
  { path: 'profil-agent', data: {breadcrumb: 'Gestion des profils des agents'}, loadChildren: () => import('./parametre/profil-agent/profil-agent.module').then(m => m.ProfilAgentModule) },
  { path: 'critere', data: {breadcrumb: 'Gestion des critères'}, loadChildren: () => import('./parametre/critere/critere.module').then(m => m.CritereModules) },
  { path: 'fonctionnaire', data: {breadcrumb: 'Gestion des profils des fonctionnaires'}, loadChildren: () => import('./parametre/fonctionnaire/fonctionnaire.module').then(m => m.FonctionnaireModule) },
  { path: 'fonction', data: {breadcrumb: 'Gestion  des fonctions'}, loadChildren: () => import('./parametre/fonction/fonction.module').then(m => m.FonctionModule) },
  { path: 'code-ministre', data: {breadcrumb: 'Code ministre'}, loadChildren: () => import('./parametre/code-ministre/code-ministre.module').then(m => m.CodeMinistreModule) },
  { path: 'fonctionnaire', data: {breadcrumb: 'Gestion  des fonctionnaires'}, loadChildren: () => import('./parametre/fonctionnaire/fonctionnaire.module').then(m => m.FonctionnaireModule) },
  { path: 'activation-compte', data: {breadcrumb: 'Gestion  des comptes'}, loadChildren: () => import('../public/activation-compte/activation-compte.module').then(m => m.ActivationCompteModule) },
  { path: 'rapport', data: {breadcrumb: 'Gestion des rapports'}, loadChildren: () => import('./parametre/rapport/rapport.module').then(m => m.RapportModule) },
  { path: 'emploi', data: {breadcrumb: 'Gestion des emplois'}, loadChildren: () => import('./parametre/emploi/emploi.module').then(m => m.EmploiModule) },
  
  { path: 'indicateur', data: {breadcrumb: 'Gestion des indicateurs'}, loadChildren: () => import('./parametre/indicateur/indicateur.module').then(m => m.IndicateurModule) },


  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class AdministrationRoutingModule { }

