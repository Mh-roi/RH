import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DomaineRoutingModule } from './domaine-routing.module';
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
import { DomaineComponent } from './domaine.component';
import { CreerModifierDomaineComponent } from './creer-modifier-domaine/creer-modifier-domaine.component';
import { DetailsDomaineComponent } from './details-domaine/details-domaine.component';


@NgModule({
  declarations: [
        DomaineComponent,
        CreerModifierDomaineComponent,
        DetailsDomaineComponent
  ],
  imports: [
    CommonModule,
    DomaineRoutingModule,
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
export class DomaineModule { }
