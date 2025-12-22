import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BibliothequeComponent } from './bibliotheque.component';

const routes: Routes = [{
  path: '',
  component: BibliothequeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BibliothequeRoutingModule { }
