import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FonctionnaireComponent } from './fonctionnaire.component';

const routes: Routes = [
  {
    path: '', component: FonctionnaireComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FonctionnaireRoutingModule { }
