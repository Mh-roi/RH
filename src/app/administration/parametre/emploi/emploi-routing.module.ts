import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmploiComponent } from './emploi.component';

const routes: Routes = [
   {
      path: '', component: EmploiComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmploiRoutingModule { }
