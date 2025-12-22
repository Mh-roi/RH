import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BibliothequeCirculaireRoutingModule } from './bibliotheque-circulaire-routing.module';
import { BibliothequeCirculaireComponent } from './bibliotheque-circulaire.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [
    BibliothequeCirculaireComponent
  ],
  imports: [
    CommonModule,
    BibliothequeCirculaireRoutingModule,
    CardModule,
    ButtonModule
  ]
})
export class BibliothequeCirculaireModule { }
