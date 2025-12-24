import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { ConfirmationService, Message } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Domaine, IDomaine } from 'src/app/shared/model/domaine';
import { DomaineService } from 'src/app/shared/service/domaine.service';

@Component({
  selector: 'app-creer-modifier-domaine',
  templateUrl: './creer-modifier-domaine.component.html',
  styleUrls: ['./creer-modifier-domaine.component.scss']
})
export class CreerModifierDomaineComponent {


  
     @ViewChild('dtf') form!: NgForm;
      domaine: IDomaine = new Domaine();
      @Input() data: IDomaine = new Domaine();
      indicateurs: IDomaine[]=[];
     // parents: ICategorie[]=[];
      error: string | undefined;
      showDialog = false;
      isDialogOpInProgress!: boolean;
      message: any;
      dialogErrorMessage: any;
      timeoutHandle: any;
      isOpInProgress!: boolean;
    
      constructor(
        private domaineService: DomaineService,
        private dialogRef: DynamicDialogRef,
        private dynamicDialog: DynamicDialogConfig,
        private confirmationService: ConfirmationService
      ) { }
    
      ngOnInit(): void {
    
        if (this.dynamicDialog.data) {
          this.domaine = cloneDeep(this.dynamicDialog.data);
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
        return !!this.domaine.id;
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
        if (this.domaine) {
          if (this.domaine.id) {
            this.domaineService.update(this.domaine).subscribe(
              {
                next: (response) => {
                  this.dialogRef.close(response);
                  this.dialogRef.destroy();
                  this.showMessage({ severity: 'success', summary: 'Domaine modifié avec succès' });
    
                },
                error: (error) => {
                  console.error("error" + JSON.stringify(error));
                  this.isOpInProgress = false;
                  this.showMessage({ severity: 'error', summary: error.error.message });
    
                }
              });
          } else {
            this.domaineService.create(this.domaine).subscribe({
              next: (response) => {
                this.dialogRef.close(response);
                this.dialogRef.destroy();
                this.showMessage({
                  severity: 'success',
                  summary: 'Domaine creer avec succès',
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
