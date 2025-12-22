import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperieurHierarchiqueMenuRoutingModule } from './superieur-hierarchique-menu-routing.module';
import { PasswordModule } from 'primeng/password';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SuperieurHierarchiqueMenuRoutingModule,
    PasswordModule
  ]
})
export class SuperieurHierarchiqueMenuModule { }
