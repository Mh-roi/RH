import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichesPosteComponent } from './fiches-poste.component';

const routes: Routes = [
  {
    path: '', component: FichesPosteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FichesPosteRoutingModule { }
