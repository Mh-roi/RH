import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicMenuComponent } from './public-menu.component';
import { MenubarModule } from 'primeng/menubar';


@NgModule({
  declarations: [
    // PublicMenuComponent
  ],
  imports: [
    CommonModule,
    MenubarModule
    
  ]
})
export class PublicMenuModule { }
