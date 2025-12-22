import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPointageComponent } from './list-pointage/list-pointage.component';
import { PointageRoutingModule } from './pointage-routing.module';
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
import { JustificationAbsenceComponent } from './justification-absence/justification-absence.component';
import { FileUploadModule } from 'primeng/fileupload';
import { DetailPointageComponent } from './detail-pointage/detail-pointage.component';
import { ToastModule } from 'primeng/toast';
import { ReclamationComponent } from '../../reclamation/reclamation.component';
import { ListeReclamationComponent } from '../../reclamation/liste-reclamation/liste-reclamation.component';
import { DetailReclamationComponent } from '../../reclamation/detail-reclamation/detail-reclamation.component';
import { ReclamationModule } from 'src/app/reclamation/reclamation.module';
@NgModule({
    declarations: [
        ListPointageComponent,
        JustificationAbsenceComponent,
        DetailPointageComponent,
        ReclamationComponent,
    ],
    imports: [
        CommonModule,
        ReclamationModule,
        PointageRoutingModule,
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
export class PointageModule {}
