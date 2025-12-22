import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccordionModule} from 'primeng/accordion';
import { AproposRoutingModule } from './apropos-routing.module';
import { AproposComponent } from './apropos.component';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [
    AproposComponent
  ],
  imports: [
    CommonModule,
    AccordionModule,
    CardModule,
    AproposRoutingModule
  ]
})
export class AproposModule { }
