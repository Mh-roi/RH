import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidationCompteRoutingModule } from './validation-compte-routing.module';
import { ValidationCompteComponent } from './validation-compte.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';


@NgModule({
  declarations: [
    ValidationCompteComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule, 
    ValidationCompteRoutingModule
  ]
})
export class ValidationCompteModule { }
