import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

import { IRapport, Rapport } from 'src/app/shared/model/rapport';
import { RapportService } from 'src/app/shared/service/rapport.service';

@Component({
  selector: 'app-creer-modifier-rapport',
  templateUrl: './creer-modifier-rapport.component.html',
  styleUrls: ['./creer-modifier-rapport.component.scss']
})
export class CreerModifierRapportComponent {

  @ViewChild('dtf') form!: NgForm;
  rapport: IRapport = new Rapport();
  @Input() data: IRapport = new Rapport();
  rapports: IRapport[]=[];
  parents: IRapport[]=[];
  error: string | undefined;
  showDialog = false;
  isDialogOpInProgress!: boolean;
  message: any;
  dialogErrorMessage: any;
  timeoutHandle: any;
  isOpInProgress!: boolean;

  constructor(
    private rapportService: RapportService,
    private dialogRef: DynamicDialogRef,
    private dynamicDialog: DynamicDialogConfig,
    private confirmationService: ConfirmationService
  ) { }


  ngOnInit(): void {
   // this.loadRapport();
    if (this.dynamicDialog.data) {
      this.rapport = cloneDeep(this.dynamicDialog.data);
    }
  }

  loadRapport(event?: LazyLoadEvent) {
    this.rapportService.findAll().subscribe(response => {
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
    return !!this.rapport.id;
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
    if (this.rapport) {
      if (this.rapport.id) {
        this.rapportService.update(this.rapport).subscribe(
          {
            next: (response) => {
              this.dialogRef.close(response);
              this.dialogRef.destroy();
              this.showMessage({ severity: 'success', summary: 'rapport modifié avec succès' });

            },
            error: (error) => {
              console.error("error" + JSON.stringify(error));
              this.isOpInProgress = false;
              this.showMessage({ severity: 'error', summary: error.error.message });

            }
          });
      } else {
        this.rapportService.create(this.rapport).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
            this.dialogRef.destroy();
            this.showMessage({
              severity: 'success',
              summary: 'rapport creer avec succès',
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
    rapportTypes = [
    { libelle: 'Rapport DRH', value: 'rapport1' },
    { libelle: 'RapporT SPMABG', value: 'rapport2' }
  ];

  periodes = [
    { libelle: 'Trimestrielle', value: 'trimestrielle' },
    { libelle: 'Semestrielle', value: 'semestrielle' }
  ];

  selectedRapportType: string = '';
  selectedPeriode: string = '';

  valider() {
    if (this.selectedRapportType && this.selectedPeriode) {
      console.log('Type de rapport :', this.selectedRapportType);
      console.log('Période :', this.selectedPeriode);
      // ici, tu peux appeler une API ou faire autre chose
    } else {
      console.warn('Veuillez sélectionner les deux champs.');
    }
  }
}
