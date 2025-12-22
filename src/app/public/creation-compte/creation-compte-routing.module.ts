import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreationCompteComponent } from './creation-compte.component';

const routes: Routes = [
    {
      path: '', component: CreationCompteComponent,
    },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreationCompteRoutingModule { }
