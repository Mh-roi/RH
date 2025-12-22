import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrhMenuRoutingModule } from './drh-menu-routing.module';
import { FormsModule } from '@angular/forms';
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
import { MenubarModule } from 'primeng/menubar';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { SplitButtonModule } from 'primeng/splitbutton';
import { KnobModule } from 'primeng/knob';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChartModule } from 'primeng/chart';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DrhMenuRoutingModule,
  FormsModule,
     ButtonModule,
     CardModule,
     DividerModule,
     ChartModule,
     InputNumberModule,
     DropdownModule,
     KnobModule,
     DynamicDialogModule,
     TableModule,
     DialogModule,
     ProgressBarModule,
     MessageModule,
     AppCommonModule,
     MenubarModule,
     SplitButtonModule,
     ConfirmDialogModule,
     ProgressSpinnerModule,
     PaginatorModule,
     PasswordModule,
     InputMaskModule
  ]
})
export class DrhMenuModule { }
