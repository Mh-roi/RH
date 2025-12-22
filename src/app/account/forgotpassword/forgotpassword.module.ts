import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordRoutingModule } from './forgotpassword-routing.module';
import { ForgotPasswordComponent } from './forgotpassword.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        InputTextModule,
        CommonModule,
        FormsModule,
        SidebarModule,
        RadioButtonModule,
        InputSwitchModule,
        ForgotPasswordRoutingModule,
    ],
    declarations: [ForgotPasswordComponent]
})
export class ForgotPasswordModule { }