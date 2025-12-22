import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmeCompteComponent } from './confirme-compte.component';

const routes: Routes = [
  { path: '', component: ConfirmeCompteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmeCompteRoutingModule { }
