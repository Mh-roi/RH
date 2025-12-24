import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { ConfirmationService, Message } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IDomaine } from 'src/app/shared/model/domaine';
import { IObjectif, Objectif } from 'src/app/shared/model/objectif';
import { DomaineService } from 'src/app/shared/service/domaine.service';
import { ObjectifService } from 'src/app/shared/service/objectif.service';

@Component({
  selector: 'app-creer-modifier-objectif',
  templateUrl: './creer-modifier-objectif.component.html',
  styleUrls: ['./creer-modifier-objectif.component.scss']
})
export class CreerModifierObjectifComponent {


   @ViewChild('dtf') form!: NgForm;
    objectif: IObjectif = new Objectif();
    @Input() data: IObjectif = new Objectif();
    objectifs: IObjectif[]=[];
    domaines: IDomaine[] = [];
   // parents: ICategorie[]=[];
    error: string | undefined;
    showDialog = false;
    isDialogOpInProgress!: boolean;
    message: any;
    dialogErrorMessage: any;
    timeoutHandle: any;
    isOpInProgress!: boolean;
  
    constructor(
      private objectifService: ObjectifService,
      private domaineService: DomaineService,
      private dialogRef: DynamicDialogRef,
      private dynamicDialog: DynamicDialogConfig,
      private confirmationService: ConfirmationService
    ) { }
  
   ngOnInit(): void {
  if (this.dynamicDialog.data) {
    this.objectif = cloneDeep(this.dynamicDialog.data);
    // Préremplir domaineId pour le dropdown
    this.objectif.domaineId = this.objectif.domaine?.id;
  }

  this.loadDomaines();
}


loadDomaines(): void {
  this.domaineService.findAll().subscribe({
    next: (response) => {
      this.domaines = response.body || [];

                console.log("Domaine a recupéré:", this.objectif.domaine);

      

    },
    error: (error: HttpErrorResponse) => {
      console.error('Erreur chargement domaines:', error);
      this.showMessage({ severity: 'error', summary: 'Impossible de charger les domaines' });
    }
  });
}


    clear(): void {
      this.form.resetForm();
      this.dialogRef.close();
      this.dialogRef.destroy();
    }
    isEditing() {
      return !!this.objectif.id;
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

  if (this.objectif) {
    // Reconstruire l'objet domaine à partir de domaineId
    if (this.objectif.domaineId) {
      this.objectif.domaine = this.domaines.find(d => d.id === this.objectif.domaineId);
    }

    if (this.objectif.id) {
      // Modification
      this.objectifService.update(this.objectif).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.dialogRef.destroy();
          this.showMessage({ severity: 'success', summary: 'Objectif modifié avec succès' });
        },
        error: (error) => {
          console.error("error" + JSON.stringify(error));
          this.isOpInProgress = false;
          this.showMessage({ severity: 'error', summary: error.error.message });
        }
      });
    } else {
      // Création
      this.objectifService.create(this.objectif).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.dialogRef.destroy();
          this.showMessage({ severity: 'success', summary: 'Objectif créé avec succès' });
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
