import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IProfilAgent, ProfilAgent } from 'src/app/shared/model/profil-agent';
import { ProfilAgentService } from 'src/app/shared/service/profil-agent.service';

@Component({
  selector: 'app-creer-modifier-profil-agent',
  templateUrl: './creer-modifier-profil-agent.component.html',
  styleUrls: ['./creer-modifier-profil-agent.component.scss']
})
export class CreerModifierProfilAgentComponent {

   
  @ViewChild('dtf') form!: NgForm;
  profil: IProfilAgent = new ProfilAgent();
  @Input() data: IProfilAgent = new ProfilAgent();
  profils: IProfilAgent[]=[];
  parents: IProfilAgent[]=[];
  error: string | undefined;
  showDialog = false;
  isDialogOpInProgress!: boolean;
  message: any;
  dialogErrorMessage: any;
  timeoutHandle: any;
  isOpInProgress!: boolean;

  constructor(
    private profilAgentService: ProfilAgentService,
    private dialogRef: DynamicDialogRef,
    private dynamicDialog: DynamicDialogConfig,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadprofil();
    if (this.dynamicDialog.data) {
      this.profil = cloneDeep(this.dynamicDialog.data);
    }
  }

  loadprofil(event?: LazyLoadEvent) {
    this.profilAgentService.findAll().subscribe(response => {
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
    return !!this.profil.id;
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
    if (this.profil) {
      if (this.profil.id) {
        this.profilAgentService.update(this.profil).subscribe(
          {
            next: (response) => {
              this.dialogRef.close(response);
              this.dialogRef.destroy();
              this.showMessage({ severity: 'success', summary: 'profil modifié avec succès' });
             
            },
            error: (error) => {
              console.error("error" + JSON.stringify(error));
              this.isOpInProgress = false;
              this.showMessage({ severity: 'error', summary: error.error.message });

            }
          });
      } else {
        console.log(":::::::::::::::::::::Profil à enregistrer::::::::::::::::::::",this.profil)
        this.profilAgentService.create(this.profil).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
            this.dialogRef.destroy();
            this.showMessage({
              severity: 'success',
              summary: 'profil creer avec succès',
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
