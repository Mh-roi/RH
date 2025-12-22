import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IPeriode, Periode } from 'src/app/shared/model/period';
import { MinistereService } from 'src/app/shared/service/ministere.service';
import { PeriodService } from 'src/app/shared/service/period.service';

@Component({
  selector: 'app-vreer-modifier-period',
  templateUrl: './creer-modifier-period.component.html',
  styleUrls: ['./creer-modifier-period.component.scss']
})
export class CreerModifierPeriodComponent {
  @ViewChild('dtf') form!: NgForm;
  periode: IPeriode = new Periode();
  @Input() data: IPeriode = new Periode();
  periodes: IPeriode[]=[];
  ministeres: IPeriode[]=[];
  error: string | undefined;
  showDialog = false;
  isDialogOpInProgress!: boolean;
  message: any;
  dialogErrorMessage: any;
  timeoutHandle: any;
  isOpInProgress!: boolean;
  date: Date | undefined;
  

  constructor(
    private periodService: PeriodService,
    private ministereService: MinistereService,
    private dialogRef: DynamicDialogRef,
    private dynamicDialog: DynamicDialogConfig,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadMinistere();
    //this.calendar();
    if (this.dynamicDialog.data) {
      this.periode = cloneDeep(this.dynamicDialog.data);
    }
  }

  loadMinistere(event?: LazyLoadEvent) {
    this.ministereService.getAll().subscribe(response => {
      this.ministeres = response.ministeres!;
      
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }
  clear(): void {
    this.form.resetForm();
    this.dialogRef.close();
    this.dialogRef.destroy();
  }
  isEditing() {
    return !!this.periode.id;
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
    if (this.periode) {
      if (this.periode.id) {
        this.periodService.update(this.periode).subscribe(
          {
            next: (response) => {
              this.dialogRef.close(response);
              this.dialogRef.destroy();
              this.showMessage({ severity: 'success', summary: 'periode modifié avec succès' });
             
            },
            error: (error) => {
              console.error("error" + JSON.stringify(error));
              this.isOpInProgress = false;
              this.showMessage({ severity: 'error', summary: error.error.message });

            }
          });
      } else {
        this.periodService.create(this.periode).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
            this.dialogRef.destroy();
            this.showMessage({
              severity: 'success',
              summary: 'periode creer avec succès',
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
