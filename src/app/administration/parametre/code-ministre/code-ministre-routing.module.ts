import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeMinistreComponent } from './code-ministre.component';

const routes: Routes = [
  {
    path: '', component: CodeMinistreComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeMinistreRoutingModule { }
