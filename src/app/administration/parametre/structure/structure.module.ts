import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateModifierStructureComponent } from './create-modifier-structure/create-modifier-structure.component';
import { DetailsStructureComponent } from './details-structure/details-structure.component';
import { StructureRoutingModule } from './structure-routing.module';
import { AppCommonModule } from "../../../shared/common/app-common.module";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    CreateModifierStructureComponent,
    DetailsStructureComponent
  ],
  imports: [
    CommonModule,
    StructureRoutingModule,
         ReactiveFormsModule,
            FormsModule,
            ButtonModule,
            DynamicDialogModule,
            TableModule,
            CardModule,
            InputTextModule,
            DialogModule,
            DividerModule,
            ProgressBarModule,
            MessageModule,
            DropdownModule,
            ConfirmDialogModule,
            ProgressSpinnerModule,
            PaginatorModule,
    AppCommonModule
]
})
export class StructureModule { }
