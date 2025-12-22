import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MinistereComponent } from './ministere.component';

const routes: Routes = [
    {
      path: '', component: MinistereComponent,
    },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinistereRoutingModule { }
