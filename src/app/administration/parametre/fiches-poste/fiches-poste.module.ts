import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FichesPosteRoutingModule } from './fiches-poste-routing.module';
import {  CreerModifierfichesPosteComponent } from './creer-modifier-fiches-poste/creer-modifier-fiches-poste.component';
import { DetailFichesPosteComponent } from './detail-fiches-poste/detail-fiches-poste.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { AppCommonModule } from 'src/app/shared/common/app-common.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PaginatorModule } from 'primeng/paginator';
import { FichesPosteComponent } from './fiches-poste.component';



@NgModule({
  declarations: [
    CreerModifierfichesPosteComponent,
    FichesPosteComponent,
    DetailFichesPosteComponent
  

  ],
  imports: [
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
    FichesPosteRoutingModule
  ]
})
export class FichesPosteModule { }
