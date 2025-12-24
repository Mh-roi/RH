import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DomaineComponent } from './domaine.component';

const routes: Routes = [
   {
        path: '', component: DomaineComponent,
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomaineRoutingModule { }
