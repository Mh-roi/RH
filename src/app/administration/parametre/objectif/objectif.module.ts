import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjectifRoutingModule } from './objectif-routing.module';
import { CreerModifierObjectifComponent } from './creer-modifier-objectif/creer-modifier-objectif.component';
import { DetailsObjectifComponent } from './details-objectif/details-objectif.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { AppCommonModule } from 'src/app/shared/common/app-common.module';
import { FonctionRoutingModule } from '../fonction/fonction-routing.module';
import { DomaineComponent } from '../domaine/domaine.component';
import { ObjectifComponent } from './objectif.component';


@NgModule({
  declarations: [
    ObjectifComponent,
    CreerModifierObjectifComponent,
    DetailsObjectifComponent
  ],
  imports: [
    CommonModule,
    ObjectifRoutingModule,
     CommonModule,
                ReactiveFormsModule,
                FormsModule,
                ButtonModule,
                DynamicDialogModule,
                TableModule,
                CardModule,
                InputTextModule,
                DialogModule,
                DividerModule,
                ProgressBarModule,
                MessageModule,
                DropdownModule,
                AppCommonModule,
                ConfirmDialogModule,
                ProgressSpinnerModule,
                PaginatorModule,
            FonctionRoutingModule
  ]
})
export class ObjectifModule { }
