import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObjectifComponent } from './objectif.component';

const routes: Routes = [
    {
        path: '', component: ObjectifComponent
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjectifRoutingModule { }
