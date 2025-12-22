import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidationCompteComponent } from './validation-compte.component';

const routes: Routes = [
  { path: '', component: ValidationCompteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidationCompteRoutingModule { }
