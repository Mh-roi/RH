import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilAgentRoutingModule } from './profil-agent-routing.module';
import { CreerModifierProfilAgentComponent } from './creer-modifier-profil-agent/creer-modifier-profil-agent.component';
import { DetailProfilAgentComponent } from './detail-profil-agent/detail-profil-agent.component';
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
import { ProfilAgentComponent } from './profil-agent.component';


@NgModule({
  declarations: [
    ProfilAgentComponent,
    CreerModifierProfilAgentComponent,
    DetailProfilAgentComponent
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
    ProfilAgentRoutingModule
  ],
  providers: [ConfirmationService,MessageService]
})
export class ProfilAgentModule { }
