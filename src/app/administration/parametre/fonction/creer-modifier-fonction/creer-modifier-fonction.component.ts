import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { ConfirmationService, Message } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IMinistere } from 'src/app/shared/model/ministere';
import { Fonction, IFonction } from 'src/app/shared/model/fonction';
import { FonctionService } from 'src/app/shared/service/fonction.service';

@Component({
  selector: 'app-creer-modifier-fonction',
  templateUrl: './creer-modifier-fonction.component.html',
  styleUrls: ['./creer-modifier-fonction.component.scss']
})
export class CreerModifierFonctionComponent {
  @ViewChild('dtf') form!: NgForm;
  fonction: IFonction = new Fonction();
  @Input() data: IFonction = new Fonction();
  fonctions: IFonction[]=[];
 // parents: ICategorie[]=[];
  error: string | undefined;
  showDialog = false;
  isDialogOpInProgress!: boolean;
  message: any;
  dialogErrorMessage: any;
  timeoutHandle: any;
  isOpInProgress!: boolean;

  constructor(
    private fonctionService: FonctionService,
    private dialogRef: DynamicDialogRef,
    private dynamicDialog: DynamicDialogConfig,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {

    if (this.dynamicDialog.data) {
      this.fonction = cloneDeep(this.dynamicDialog.data);
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
    return !!this.fonction.id;
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
    if (this.fonction) {
      if (this.fonction.id) {
        this.fonctionService.update(this.fonction).subscribe(
          {
            next: (response) => {
              this.dialogRef.close(response);
              this.dialogRef.destroy();
              this.showMessage({ severity: 'success', summary: 'fonction modifié avec succès' });

            },
            error: (error) => {
              console.error("error" + JSON.stringify(error));
              this.isOpInProgress = false;
              this.showMessage({ severity: 'error', summary: error.error.message });

            }
          });
      } else {
        this.fonctionService.create(this.fonction).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
            this.dialogRef.destroy();
            this.showMessage({
              severity: 'success',
              summary: 'fonction creer avec succès',
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
