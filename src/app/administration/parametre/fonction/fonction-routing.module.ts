import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FonctionComponent } from './fonction.component';

const routes: Routes = [
  {
    path: '', component: FonctionComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FonctionRoutingModule { }
