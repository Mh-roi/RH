import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesNotesComponent } from './mes-notes.component';

const routes: Routes = [
  {
    path: '', component: MesNotesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MesNotesRoutingModule { }
