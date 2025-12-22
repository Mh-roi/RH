import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BibliothequeRoutingModule } from './bibliotheque-routing.module';
import { BibliothequeComponent } from './bibliotheque.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    BibliothequeComponent
  ],
  imports: [
    CommonModule,
    BibliothequeRoutingModule,
    CardModule,
    ButtonModule
  ]
})
export class BibliothequeModule { }
