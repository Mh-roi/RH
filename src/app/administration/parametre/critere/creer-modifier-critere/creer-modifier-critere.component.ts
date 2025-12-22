import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ICritere, Critere } from 'src/app/shared/model/critere';
import { IProfilAgent } from 'src/app/shared/model/profil-agent';
import { CritereService } from 'src/app/shared/service/critere.service';
import { ProfilAgentService } from 'src/app/shared/service/profil-agent.service';

@Component({
  selector: 'app-creer-modifier-critere',
  templateUrl: './creer-modifier-critere.component.html',
  styleUrls: ['./creer-modifier-critere.component.scss']
})
export class CreerModifierCritereComponent {
 
  @ViewChild('dtf') form!: NgForm;
  critere: ICritere = new Critere();
  @Input() data: ICritere = new Critere();
  criteres: ICritere[]=[];
  profilAgents: IProfilAgent[]=[];
  error: string | undefined;
  showDialog = false;
  isDialogOpInProgress!: boolean;
  message: any;
  dialogErrorMessage: any;
  timeoutHandle: any;
  isOpInProgress!: boolean;

  constructor(
    private critereService: CritereService,
    private profilAgentService: ProfilAgentService,
    private dialogRef: DynamicDialogRef,
    private dynamicDialog: DynamicDialogConfig,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadProfilAgent();
    if (this.dynamicDialog.data) {
      this.critere = cloneDeep(this.dynamicDialog.data);
    }
  }

  loadProfilAgent(event?: LazyLoadEvent) {
    this.profilAgentService.findAll().subscribe(response => {
      this.profilAgents = response.body!;
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
    return !!this.critere.id;
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
    if (this.critere) {
      if (this.critere.id) {
        this.critereService.update(this.critere).subscribe(
          {
            next: (response) => {
              this.dialogRef.close(response);
              this.dialogRef.destroy();
              this.showMessage({ severity: 'success', summary: 'critère modifié avec succès' });
             
            },
            error: (error) => {
              console.error("error" + JSON.stringify(error));
              this.isOpInProgress = false;
              this.showMessage({ severity: 'error', summary: error.error.message });

            }
          });
      } else {
        this.critereService.create(this.critere).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
            this.dialogRef.destroy();
            this.showMessage({
              severity: 'success',
              summary: 'critère créé avec succès',
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
