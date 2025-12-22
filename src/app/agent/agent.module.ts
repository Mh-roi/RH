import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';
import { AgentComponent } from './agent.component';
import { AgentHomeComponent } from './agent-home/agent-home.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { KnobModule } from 'primeng/knob';
import { AgentMenuComponent } from './agent-menu/agent-menu.component';
import { AgentLandingComponent } from './agent-landing/agent-landing.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { AppCommonModule } from '../shared/common/app-common.module';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';


@NgModule({
  declarations: [
    AgentComponent,
    AgentHomeComponent,
    AgentMenuComponent,
    AgentLandingComponent
  ],
  imports: [
    CommonModule,
    AgentRoutingModule,
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
export class AgentModule { }
