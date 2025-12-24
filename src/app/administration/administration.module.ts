import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { DashboardAdministrationComponent } from './dashboard-administration.component';
import { DividerModule } from 'primeng/divider';

import { MessagesModule } from 'primeng/messages';
import { ActionsToolbarIudComponent } from '../shared/comon/actions-toolbar-iud/actions-toolbar-iud.component';
import { ButtonModule } from 'primeng/button';
import { KnobModule } from 'primeng/knob';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CrudToolbarComponent } from '../shared/comon/crud-toolbar/crud-toolbar.component';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MesNotesComponent } from './parametre/mes-notes/mes-notes.component';
import { CodeMinistreComponent } from './parametre/code-ministre/code-ministre.component';
import { InputMaskModule } from 'primeng/inputmask';
import { DashbordComponent } from './dashbord/dashbord.component';
import { DialogModule } from 'primeng/dialog';
import { NotesAgentsComponent } from './parametre/notes-agents/notes-agents.component';
import { ComonModule } from "../shared/comon/comon.module";
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StructureComponent } from './parametre/structure/structure.component';
import { EmploiComponent } from './parametre/emploi/emploi.component';
import { DomaineComponent } from './parametre/domaine/domaine.component';
import { CreerModifierDomaineComponent } from './parametre/domaine/creer-modifier-domaine/creer-modifier-domaine.component';
import { DetailsDomaineComponent } from './parametre/domaine/details-domaine/details-domaine.component';
import { ObjectifComponent } from './parametre/objectif/objectif.component';



@NgModule({
    declarations: [
        DashboardAdministrationComponent,
        ActionsToolbarIudComponent,
        CrudToolbarComponent,
        CrudToolbarComponent,
        CrudToolbarComponent,
        CodeMinistreComponent,
        DashbordComponent,
        NotesAgentsComponent,
        StructureComponent,
        EmploiComponent
    
    ],
    exports: [
        MessagesModule,
        ActionsToolbarIudComponent,
        CrudToolbarComponent
    ],
    imports: [
        CommonModule,
        AdministrationRoutingModule,
        DividerModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        InputNumberModule,
        MessagesModule,
        MessageModule,
        ProgressSpinnerModule,
        ButtonModule,
        KnobModule,
        ChartModule,
        TableModule,
        ToastModule,
        DropdownModule,
        InputMaskModule,
        DialogModule,
        ComonModule
    ]
})
export class AdministrationModule { }
