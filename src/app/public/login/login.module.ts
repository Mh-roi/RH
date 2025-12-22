import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        ButtonModule,
        InputTextModule,
        CheckboxModule,
        PasswordModule,
        FormsModule,
        ConfirmDialogModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }
