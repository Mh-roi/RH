import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperieurHierarchiqueRoutingModule } from './superieur-hierarchique-routing.module';
import { SuperieurHierarchiqueHomeComponent } from './superieur-hierarchique-home/superieur-hierarchique-home.component';
import { SuperieurHierarchiqueMenuComponent } from './superieur-hierarchique-menu/superieur-hierarchique-menu.component';
import { SuperieurHierarchiqueLandingComponent } from './superieur-hierarchique-landing/superieur-hierarchique-landing.component';
import { FormsModule } from '@angular/forms';
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
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';


@NgModule({
  declarations: [
    SuperieurHierarchiqueHomeComponent,
    SuperieurHierarchiqueMenuComponent,
    SuperieurHierarchiqueLandingComponent
  ],
  imports: [
    CommonModule,
    SuperieurHierarchiqueRoutingModule,
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
export class SuperieurHierarchiqueModule { }
