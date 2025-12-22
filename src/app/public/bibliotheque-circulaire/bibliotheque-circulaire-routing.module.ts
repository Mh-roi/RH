import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BibliothequeCirculaireComponent } from './bibliotheque-circulaire.component';

const routes: Routes = [{
  path: '',
  component: BibliothequeCirculaireComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BibliothequeCirculaireRoutingModule { }
