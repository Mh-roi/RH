import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CritereComponent } from './critere.component';

const routes: Routes = [
  {
    path: '', component: CritereComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CritereRoutingModule { }
