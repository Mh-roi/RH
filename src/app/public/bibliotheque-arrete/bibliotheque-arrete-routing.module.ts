import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BibliothequeArreteComponent } from './bibliotheque-arrete.component';

const routes: Routes = [{
  path: '',
  component: BibliothequeArreteComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BibliothequeArreteRoutingModule { }
