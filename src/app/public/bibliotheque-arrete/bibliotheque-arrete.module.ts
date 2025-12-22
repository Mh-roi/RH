import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BibliothequeArreteRoutingModule } from './bibliotheque-arrete-routing.module';
import { BibliothequeArreteComponent } from './bibliotheque-arrete.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [
    BibliothequeArreteComponent
  ],
  imports: [
    CommonModule,
    BibliothequeArreteRoutingModule,
    CardModule,
    ButtonModule
  ]
})
export class BibliothequeArreteModule { }
