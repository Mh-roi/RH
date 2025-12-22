import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeriodRoutingModule } from './period-routing.module';
import { PeriodComponent } from './period.component';

import { DetailPeriodComponent } from './detail-period/detail-period.component';
import { CreerModifierPeriodComponent } from './creer-modifier-period/creer-modifier-period.component';
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
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    PeriodComponent,
    CreerModifierPeriodComponent,
    DetailPeriodComponent
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
    CalendarModule,
    PaginatorModule,
    PeriodRoutingModule
  ],
  providers: [ConfirmationService,MessageService],
})
export class PeriodModule { }
