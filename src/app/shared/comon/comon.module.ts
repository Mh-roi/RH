import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsToolbarIudComponent } from './actions-toolbar-iud/actions-toolbar-iud.component';
import { CrudToolbarComponent } from './crud-toolbar/crud-toolbar.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';



@NgModule({
  declarations: [
    // ActionsToolbarIudComponent

    // CrudToolbarComponent
    ConfirmationComponent,
  ],
  imports: [
    CommonModule,
    ConfirmDialogModule,
  ],
  exports: [
    // ActionsToolbarIudComponent,
    ConfirmationComponent
  ],

  providers: [ConfirmationService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComonModule { }
