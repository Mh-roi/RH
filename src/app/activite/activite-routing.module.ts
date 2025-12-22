import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiviteComponent } from './activite.component';

const routes: Routes = [
  {
    path: '', component: ActiviteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActiviteRoutingModule { }
