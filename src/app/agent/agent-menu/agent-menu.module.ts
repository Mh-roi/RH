import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentMenuRoutingModule } from './agent-menu-routing.module';
import { PasswordModule } from 'primeng/password';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AgentMenuRoutingModule,
    PasswordModule
  ]
})
export class AgentMenuModule { }
