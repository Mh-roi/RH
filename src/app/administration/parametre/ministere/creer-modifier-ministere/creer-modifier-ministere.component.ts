import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IMinistere, Ministere } from 'src/app/shared/model/ministere';
import { MinistereService } from 'src/app/shared/service/ministere.service';

@Component({
  selector: 'app-creer-modifier-ministere',
  templateUrl: './creer-modifier-ministere.component.html',
  styleUrls: ['./creer-modifier-ministere.component.scss']
})
export class CreerModifierMinistereComponent {


    @ViewChild('dtf') form!: NgForm;
    ministere: IMinistere = new Ministere();
    @Input() data: IMinistere = new Ministere();
    ministeress: IMinistere[]=[];
   // parents: ICategorie[]=[];
    error: string | undefined;
    showDialog = false;
    isDialogOpInProgress!: boolean;
    message: any;
    dialogErrorMessage: any;
    timeoutHandle: any;
    isOpInProgress!: boolean;

    constructor(
      private ministereService: MinistereService,
      private dialogRef: DynamicDialogRef,
      private dynamicDialog: DynamicDialogConfig,
      private confirmationService: ConfirmationService
    ) { }

    ngOnInit(): void {

      if (this.dynamicDialog.data) {
        this.ministere = cloneDeep(this.dynamicDialog.data);
      }

    }

  /*  loadMinistere(event?: LazyLoadEvent) {
      this.ministereService.findAll().subscribe(response => {
        this.parents = response.body!;
      }, error => {
        this.message = { severity: 'error', summary: error.error };
        console.error(JSON.stringify(error));
      });
    }*/
    clear(): void {
      this.form.resetForm();
      this.dialogRef.close();
      this.dialogRef.destroy();
    }
    isEditing() {
      return !!this.ministere.id;
    }

    clearDialogMessages() {
      this.dialogErrorMessage = null;
    }
    // Errors
    handleError(error: HttpErrorResponse) {
      console.error(`Processing Error: ${JSON.stringify(error)}`);
      this.isDialogOpInProgress = false;
      this.dialogErrorMessage = error.error.title;
    }

    showMessage(message: Message) {
      this.message = message;
      this.timeoutHandle = setTimeout(() => {
        this.message = null;
      }, 5000);
    }
    saveEntity(): void {
      this.clearDialogMessages();
      this.isDialogOpInProgress = true;
      if (this.ministere) {
        if (this.ministere.id) {
          this.ministereService.update(this.ministere).subscribe(
            {
              next: (response) => {
                this.dialogRef.close(response);
                this.dialogRef.destroy();
                this.showMessage({ severity: 'success', summary: 'ministere modifié avec succès' });

              },
              error: (error) => {
                console.error("error" + JSON.stringify(error));
                this.isOpInProgress = false;
                this.showMessage({ severity: 'error', summary: error.error.message });

              }
            });
        } else {
          this.ministereService.create(this.ministere).subscribe({
            next: (response) => {
              this.dialogRef.close(response);
              this.dialogRef.destroy();
              this.showMessage({
                severity: 'success',
                summary: 'ministere creer avec succès',
              });
            },
            error: (error) => {
              console.error("error" + JSON.stringify(error));
              this.isOpInProgress = false;
              this.showMessage({ severity: 'error', summary: error.error.message });

            }
          });
        }
      }
    }


}
