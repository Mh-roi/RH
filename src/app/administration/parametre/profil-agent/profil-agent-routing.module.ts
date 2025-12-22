import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilAgentComponent } from './profil-agent.component';

const routes: Routes = [
  {
    path: '', component: ProfilAgentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilAgentRoutingModule { }
