import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndicateurComponent } from './indicateur.component';

const routes: Routes = [
   {
      path: '', component: IndicateurComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndicateurRoutingModule { }
