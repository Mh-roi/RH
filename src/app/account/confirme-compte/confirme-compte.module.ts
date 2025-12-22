import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmeCompteRoutingModule } from './confirme-compte-routing.module';
import { ConfirmeCompteComponent } from './confirme-compte.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [
   ConfirmeCompteComponent
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
    ConfirmeCompteRoutingModule
  ]
})
export class ConfirmeCompteModule { }
