import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeMinistreRoutingModule } from './code-ministre-routing.module';
import { InputMaskModule } from 'primeng/inputmask';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CodeMinistreRoutingModule,
    InputMaskModule
  ]
})
export class CodeMinistreModule { }
