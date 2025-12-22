import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashbordRoutingModule } from './dashbord-routing.module';
//import { DashbordComponent } from './dashbord.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { KnobModule } from 'primeng/knob';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';


@NgModule({
  declarations: [
    //DashbordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartModule,
    DividerModule,
    ButtonModule,
    CardModule,
    DividerModule,
    MenuModule,
    MenubarModule,
    ChartModule,
    InputNumberModule,
    DropdownModule,
    DashbordRoutingModule,
    KnobModule
  ]
})
export class DashbordModule { }
