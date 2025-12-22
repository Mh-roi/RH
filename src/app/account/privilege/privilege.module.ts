import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivilegeRoutingModule } from './privilege-routing.module';
import { PrivilegeComponent } from './privilege.component';
import { DetailsPrivilegeComponent } from './details-privilege/details-privilege.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { AppCommonModule } from 'src/app/shared/common/app-common.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';


@NgModule({
  declarations: [
    PrivilegeComponent,
    DetailsPrivilegeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    CardModule,
    ConfirmDialogModule,
    PanelModule,
    InputTextModule,
    DialogModule,
    AppCommonModule,
    ProgressSpinnerModule,
    DividerModule,
    TableModule,
    MessageModule,
    MessagesModule,
    FormsModule,
    ButtonModule,
    DynamicDialogModule, 
    PrivilegeRoutingModule
  ]
})
export class PrivilegeModule { }
