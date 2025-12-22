import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfosUserRoutingModule } from './infos-user-routing.module';
import { InfosUserComponent } from './infos-user.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PasswordStrengthComponent } from 'src/app/shared/util/password-strength/password-strength.component';
import { ModifierUserComponent } from './modifier-user/modifier-user.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageModule } from 'primeng/message';
import { AppCommonModule } from "../../shared/common/app-common.module";
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';


@NgModule({
    declarations: [
        InfosUserComponent,
        PasswordStrengthComponent,
        ModifierUserComponent
    ],
    imports: [
        CommonModule,
        ButtonModule,
        InputTextModule,
        CommonModule,
        FormsModule,
        RippleModule,
        SidebarModule,
        RadioButtonModule,
        InputSwitchModule,
        InfosUserRoutingModule,
        ProgressBarModule,
        MessageModule,
        AppCommonModule,
        DynamicDialogModule,
        DialogModule,
    ],
    providers: [ConfirmationService,MessageService,DynamicDialogConfig],
})
export class InfosUserModule { }
