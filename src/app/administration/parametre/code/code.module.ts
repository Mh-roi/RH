import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeRoutingModule } from './code-routing.module';
import { GenererCodeComponent } from './generer-code/generer-code.component';
import { ChangerCodeComponent } from './changer-code/changer-code.component';
import { CodeComponent } from './code.component';
import { FormsModule } from '@angular/forms';
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
import { ToastModule } from 'primeng/toast';
import { AfficherCodeComponent } from './afficher-code/afficher-code.component';


@NgModule({
  declarations: [
    GenererCodeComponent,
    ChangerCodeComponent,
    CodeComponent,
    AfficherCodeComponent
  ],
  imports: [
    CommonModule,
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
    CodeRoutingModule,
    ToastModule,
    CardModule
  ]
})
export class CodeModule { }
