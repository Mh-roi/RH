import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrhHomeRoutingModule } from './drh-home-routing.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { KnobModule } from 'primeng/knob';
import { AppCommonModule } from 'src/app/shared/common/app-common.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppCommonModule,
    DrhHomeRoutingModule,
    FormsModule,
    ButtonModule,
    CardModule,
    DividerModule,
    ChartModule,
    InputNumberModule,
    DropdownModule,
    KnobModule
  ]
})
export class DrhHomeModule { }
