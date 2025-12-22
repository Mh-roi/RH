import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinistereRoutingModule } from './ministere-routing.module';
import { CreerModifierMinistereComponent } from './creer-modifier-ministere/creer-modifier-ministere.component';
import { DetailsMinistereComponent } from './details-ministere/details-ministere.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MinistereComponent } from './ministere.component';


@NgModule({
  declarations: [
    MinistereComponent,
    CreerModifierMinistereComponent,
    DetailsMinistereComponent
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
    MinistereRoutingModule

  ],
  providers: [ConfirmationService,MessageService],
})
export class MinistereModule { }
