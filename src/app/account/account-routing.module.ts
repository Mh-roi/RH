import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', component: DashboardAdministrationComponent },
  { path: 'compte', data: {breadcrumb: 'user'}, loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'privilege', data: {breadcrumb: 'privilege'}, loadChildren: () => import('./privilege/privilege.module').then(m => m.PrivilegeModule) },
  
  // { path:'account/activate', component: CompteValidationComponent},
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
