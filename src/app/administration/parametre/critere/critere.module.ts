import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CritereRoutingModule } from './critere-routing.module';
import { CritereComponent } from './critere.component';
import { CreerModifierCritereComponent } from './creer-modifier-critere/creer-modifier-critere.component';
import { DetailCritereComponent } from './detail-critere/detail-critere.component';
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
import { CheckboxModule } from 'primeng/checkbox';


@NgModule({
  declarations: [
    CritereComponent,
    CreerModifierCritereComponent,
    DetailCritereComponent
  ],
  imports: [
    CommonModule,
    CritereRoutingModule,
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
    CheckboxModule
  ]
})
export class CritereModules { }
