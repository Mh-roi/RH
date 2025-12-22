import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RapportRoutingModule } from './rapport-routing.module';
import { RapportComponent } from './rapport.component';
import { CreerModifierRapportComponent } from './creer-modifier-rapport/creer-modifier-rapport.component';
import { DetailsRapportComponent } from './details-rapport/details-rapport.component';
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
import { CertifierRapportComponent } from './certifier-rapport/certifier-rapport.component';
import { CheckboxModule } from 'primeng/checkbox';


@NgModule({
  declarations: [
    RapportComponent,
    CreerModifierRapportComponent,
    DetailsRapportComponent,
    CertifierRapportComponent
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
        CheckboxModule,
        PaginatorModule,
    RapportRoutingModule
  ]
})
export class RapportModule { }
