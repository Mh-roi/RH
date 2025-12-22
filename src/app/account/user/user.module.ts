import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { CreerModifierUserComponent } from './creer-modifier-user/creer-modifier-user.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { AppCommonModule } from 'src/app/shared/common/app-common.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { AvatarModule } from 'primeng/avatar';
import { FileUploadModule } from 'primeng/fileupload';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';


@NgModule({
  declarations: [
    UserComponent,
    CreerModifierUserComponent,
    DetailUserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    CardModule,
    InputMaskModule,
    ConfirmDialogModule,
    PanelModule,
    InputTextModule,
    DialogModule,
    PasswordModule,
    AppCommonModule,
    ProgressBarModule,
    AvatarModule,
    CalendarModule,
    FileUploadModule,
    ProgressSpinnerModule,
    DividerModule,
    DropdownModule,
    TableModule,
    MessageModule,
    MessagesModule,
    FormsModule,
    ButtonModule,
    DynamicDialogModule, 
    UserRoutingModule
  ]
})
export class UserModule { }
