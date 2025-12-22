import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { ConfirmationService, Message } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IIndicateur, Indicateur } from 'src/app/shared/model/indicateur';
import { IndicateurService } from 'src/app/shared/service/indicateur.service';

@Component({
  selector: 'app-creer-modifier-Indicateur',
  templateUrl: './creer-modifier-Indicateur.component.html',
  styleUrls: ['./creer-modifier-Indicateur.component.scss']
})
export class CreerModifierIndicateurComponent {


   @ViewChild('dtf') form!: NgForm;
    indicateur: IIndicateur = new Indicateur();
    @Input() data: IIndicateur = new Indicateur();
    indicateurs: IIndicateur[]=[];
   // parents: ICategorie[]=[];
    error: string | undefined;
    showDialog = false;
    isDialogOpInProgress!: boolean;
    message: any;
    dialogErrorMessage: any;
    timeoutHandle: any;
    isOpInProgress!: boolean;
  
    constructor(
      private indicateurService: IndicateurService,
      private dialogRef: DynamicDialogRef,
      private dynamicDialog: DynamicDialogConfig,
      private confirmationService: ConfirmationService
    ) { }
  
    ngOnInit(): void {
  
      if (this.dynamicDialog.data) {
        this.indicateur = cloneDeep(this.dynamicDialog.data);
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
      return !!this.indicateur.id;
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
      if (this.indicateur) {
        if (this.indicateur.id) {
          this.indicateurService.update(this.indicateur).subscribe(
            {
              next: (response) => {
                this.dialogRef.close(response);
                this.dialogRef.destroy();
                this.showMessage({ severity: 'success', summary: 'Indicateur modifié avec succès' });
  
              },
              error: (error) => {
                console.error("error" + JSON.stringify(error));
                this.isOpInProgress = false;
                this.showMessage({ severity: 'error', summary: error.error.message });
  
              }
            });
        } else {
          this.indicateurService.create(this.indicateur).subscribe({
            next: (response) => {
              this.dialogRef.close(response);
              this.dialogRef.destroy();
              this.showMessage({
                severity: 'success',
                summary: 'Indicateur creer avec succès',
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
