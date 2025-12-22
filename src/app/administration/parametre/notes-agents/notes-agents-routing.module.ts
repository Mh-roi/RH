import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesAgentsComponent } from './notes-agents.component';

const routes: Routes = [
  {
    path: '', component: NotesAgentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesAgentsRoutingModule { }
