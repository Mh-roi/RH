import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MesAgentsRoutingModule } from './mes-agents-routing.module';
import { DetailAgentComponent } from './detail-agent/detail-agent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { KnobModule } from 'primeng/knob';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { AppCommonModule } from '../shared/common/app-common.module';
import { CreerModifierAgentComponent } from './creer-modifier-agent/creer-modifier-agent.component';
import { AjoutModifierPointageComponent } from './pointage/ajout-modifier-pointage/ajout-modifier-pointage.component';

@NgModule({
    declarations: [
        DetailAgentComponent,
        CreerModifierAgentComponent,
        AjoutModifierPointageComponent,
    ],
    imports: [
        CommonModule,
        MesAgentsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
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
    ],
})
export class MesAgentsModule {}
