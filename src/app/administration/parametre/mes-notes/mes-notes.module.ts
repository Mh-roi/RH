import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MesNotesRoutingModule } from './mes-notes-routing.module';
import { MesNotesComponent } from './mes-notes.component';
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
import { ToastModule } from 'primeng/toast';
import { ActivationCompteModule } from 'src/app/public/activation-compte/activation-compte.module';
import { AfficherNoteComponent } from './afficher-note/afficher-note.component';
import { ModifierNoteComponent } from './modifier-note/modifier-note.component';



@NgModule({
  declarations: [
    MesNotesComponent,
    AfficherNoteComponent,
    ModifierNoteComponent
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
    MesNotesRoutingModule,
    ToastModule,
    ActivationCompteModule
  ]
})
export class MesNotesModule { }
