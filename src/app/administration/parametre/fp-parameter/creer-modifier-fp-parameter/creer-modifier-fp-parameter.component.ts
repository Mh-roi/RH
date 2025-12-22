import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IFPParameter, FPParameter } from 'src/app/shared/model/fp-parameter';
import { FPParameterService } from 'src/app/shared/service/fp-parameter.service';


@Component({
  selector: 'app-creer-modifier-fp-parameter',
  templateUrl: './creer-modifier-fp-parameter.component.html',
  styleUrls: ['./creer-modifier-fp-parameter.component.scss']
})
export class CreerModifierFpParameterComponent implements OnInit {
  
  @ViewChild('dtf') form!: NgForm;
  fPParameter: IFPParameter = new FPParameter();
  @Input() data: IFPParameter = new FPParameter();
  fPParameters: IFPParameter[]=[];
  parents: IFPParameter[]=[];
  error: string | undefined;
  showDialog = false;
  isDialogOpInProgress!: boolean;
  message: any;
  dialogErrorMessage: any;
  timeoutHandle: any;
  isOpInProgress!: boolean;

  constructor(
    private fPParameterService: FPParameterService,
    private dialogRef: DynamicDialogRef,
    private dynamicDialog: DynamicDialogConfig,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadFPParameter();
    if (this.dynamicDialog.data) {
      this.fPParameter = cloneDeep(this.dynamicDialog.data);
    }
  }

  loadFPParameter(event?: LazyLoadEvent) {
    this.fPParameterService.findAll().subscribe(response => {
      this.parents = response.body!;
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
    return !!this.fPParameter.id;
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
    if (this.fPParameter) {
      if (this.fPParameter.id) {
        console.log(this.fPParameter);
        this.fPParameterService.update(this.fPParameter).subscribe(
          {
            next: (response) => {
              this.dialogRef.close(response);
              this.dialogRef.destroy();
              this.showMessage({ severity: 'success', summary: 'fPParameter modifié avec succès' });
             
            },
            error: (error) => {
              console.error("error" + JSON.stringify(error));
              this.isOpInProgress = false;
              this.showMessage({ severity: 'error', summary: error.error.message });

            }
          });
      } else {
        this.fPParameterService.create(this.fPParameter).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
            this.dialogRef.destroy();
            this.showMessage({
              severity: 'success',
              summary: 'fPParameter creer avec succès',
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
