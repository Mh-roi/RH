import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfosUserComponent } from './infos-user.component';
import { ModifierUserComponent } from './modifier-user/modifier-user.component';

const routes: Routes = [
  { path: '', component: InfosUserComponent },
  { path: 'modifier-user', component: ModifierUserComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfosUserRoutingModule { }
