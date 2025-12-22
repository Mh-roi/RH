import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActiviteRoutingModule } from './activite-routing.module';
//import { ActiviteComponent } from './activite.component';
import { CreerModifierActiviteComponent } from './creer-modifier-activite/creer-modifier-activite.component';
import { DetailActiviteComponent } from './detail-activite/detail-activite.component';
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
//import { AppCommonModule } from '../shared/common/app-common.module';
import { ToastModule } from 'primeng/toast';
import { ActionsToolbarIudComponent } from '../shared/common/actions-toolbar-iud/actions-toolbar-iud.component';
import { AppCommonModule } from '../shared/common/app-common.module';
import { ActiviteComponent } from './activite.component';


@NgModule({
  declarations: [
    ActiviteComponent,
    CreerModifierActiviteComponent,
    DetailActiviteComponent,
    //ActionsToolbarIudComponent
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
        ToastModule,
        
        ActiviteRoutingModule
  ]
})
export class ActiviteModule { }
