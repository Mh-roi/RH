import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { KnobModule } from 'primeng/knob';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ListeReclamationComponent } from './liste-reclamation/liste-reclamation.component';
import { DetailReclamationComponent } from './detail-reclamation/detail-reclamation.component';

@NgModule({
    declarations: [ListeReclamationComponent, DetailReclamationComponent],
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        CardModule,
        DividerModule,
        ChartModule,
        InputNumberModule,
        DropdownModule,
        KnobModule,
        DynamicDialogModule,
        TableModule,
        DialogModule,
        ProgressBarModule,
        MessageModule,
        MenubarModule,
        SplitButtonModule,
        ConfirmDialogModule,
        ProgressSpinnerModule,
        PaginatorModule,
        AvatarModule,
        CalendarModule,
        FileUploadModule,
        ToastModule,
            

    ],
})
export class ReclamationModule {}
