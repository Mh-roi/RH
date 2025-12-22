import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrhRoutingModule } from './drh-routing.module';
import { DrhComponent } from './drh.component';
import { DrhHomeComponent } from './drh-home/drh-home.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { KnobModule } from 'primeng/knob';
import { DrhMenuComponent } from './drh-menu/drh-menu.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MessageModule } from 'primeng/message';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { AppCommonModule } from '../shared/common/app-common.module';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenubarModule } from 'primeng/menubar';
import { DrhLandingComponent } from './drh-landing/drh-landing.component';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';


@NgModule({
  declarations: [
    DrhComponent,
    DrhHomeComponent,
    DrhMenuComponent,
    DrhLandingComponent
  ],
  imports: [
    CommonModule,
    DrhRoutingModule,
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
export class DrhModule { }
