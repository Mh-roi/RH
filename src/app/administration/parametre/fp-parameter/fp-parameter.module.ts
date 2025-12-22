import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FpParameterRoutingModule } from './fp-parameter-routing.module';
import { DetailsFpParameterComponent } from './details-fp-parameter/details-fp-parameter.component';
import { CreerModifierFpParameterComponent } from './creer-modifier-fp-parameter/creer-modifier-fp-parameter.component';
import { FpParameterComponent } from './fp-parameter.component';
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
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    FpParameterComponent,
    DetailsFpParameterComponent,
    CreerModifierFpParameterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    MessageModule,
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
    FpParameterRoutingModule
  ],
  providers: [ConfirmationService,MessageService],
})
export class FpParameterModule { }
