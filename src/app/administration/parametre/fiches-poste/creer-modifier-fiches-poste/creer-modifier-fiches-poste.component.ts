import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as saveAs from 'file-saver';
import { cloneDeep } from 'lodash';
import { ConfirmationService, LazyLoadEvent, Message, MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ICategorie } from 'src/app/shared/model/categorie';
import { FichesPoste, IFichesPoste } from 'src/app/shared/model/fiches-poste';
import { CategorieService } from 'src/app/shared/service/categorie.service';
import { FichesPosteService } from 'src/app/shared/service/fiches-poste.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-creer-modifierfiches-poste',
  templateUrl: './creer-modifier-fiches-poste.component.html',
  styleUrls: ['./creer-modifier-fiches-poste.component.scss']
})
export class CreerModifierfichesPosteComponent implements OnInit{
  
  @ViewChild('dtf') form!: NgForm;
  fichesPoste: IFichesPoste = new FichesPoste();
   //fichesPoste: FichesPoste = {};
  @Input() data: IFichesPoste = new FichesPoste();
  fichesPostes: IFichesPoste[]=[];
  totalRecords!: number;
  categories: ICategorie[]=[];
  error: string | undefined;
  showDialog = false;
  isDialogOpInProgress!: boolean;
  recordsPerPage = environment.recordsPerPage;
  message: any;
  selection: any;
  dialogErrorMessage: any;
  timeoutHandle: any;
  isOpInProgress!: boolean;
  file: Blob | string = '';
  submitted!: boolean;
  selectedFile: File | null = null;

  
  constructor(
    private fichesPosteService: FichesPosteService,
    private categorieService: CategorieService,
    private dialogRef: DynamicDialogRef,
    private dynamicDialog: DynamicDialogConfig,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadCategorie();
    if (this.dynamicDialog.data) {
      this.fichesPoste = cloneDeep(this.dynamicDialog.data);
    };

    this.messageService.messageObserver.subscribe((message) => {
      this.showToast(message);
    });
  }
  showToast(message: Message | Message[]) {
    if (Array.isArray(message)) {
      message.forEach((msg) => this.messageService.add(msg));
    } else {
      this.messageService.add(message);
    }
  }

  loadCategorie(event?: LazyLoadEvent) {
    this.categorieService.findAll().subscribe(response => {
     this.categories = response.body!;
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }
  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    const formData: FormData = new FormData();
    const fichesPosteAsJson: Blob = new Blob([JSON.stringify(this.fichesPoste)], { type: 'application/json' });
    formData.append('fichePoste', fichesPosteAsJson);
    formData.append('multipartFile', this.file);
    this.fichesPosteService.create(formData).subscribe(response => {
      if (this.fichesPostes.length !== this.recordsPerPage) {
        this.fichesPostes.push(response.body!);
        this.fichesPostes = this.fichesPostes.slice();
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Fiche de poste créée avec succès' });
    }, error => this.handleError(error));

  }

  clear(): void {
    this.form.resetForm();
    this.dialogRef.close();
    this.dialogRef.destroy();
  }
  isEditing() {
    return !!this.fichesPoste.id;
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

  onSelectFile(event: any): void {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
  }

  //////////////////////////////////////////////////////////////////////////////////::::
  saveFichePoste() {
    this.submitted = true;
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    if (this.categories.length == 0 || this.categories.length == null) {
      this.showMessage({
        severity: 'error',
        summary: 'Echec',
        detail: 'Aucune catégorie n\'a été créée. Vous devez d\'abord créer au moins une catégorie.',
        life: 5000,
      });
    } else {
      if (this.fichesPoste.categorie?.libelle == null) {
        this.showMessage({
          severity: 'error',
          summary: 'Echec',
          detail: 'Veuillez sélectionner une catégorie !',
          life: 5000,
        });
      } else {
        if (this.fichesPoste.id) {
          this.fichesPosteService.update(this.fichesPoste).subscribe(
            (response) => {
              if (this.fichesPostes.length !== this.recordsPerPage) {
                this.fichesPostes.push(response.body!);
                this.fichesPostes = this.fichesPostes.slice();
              }
              this.fichesPostes[this.findIndexById(this.fichesPoste.id)] = this.fichesPoste;
              this.showMessage({
                severity: 'success',
                summary: 'Succès',
                detail: 'Fiche de poste modifiée avec succès',
                life: 3000,
              });
              this.dialogRef.close(response);
              this.dialogRef.close();
            },
            (error) => this.handleError(error)
          );
        } else {
          const formData: FormData = new FormData();
          const fichesPosteAsJson: Blob = new Blob([JSON.stringify(this.fichesPoste)], { type: 'application/json' });
          formData.append('fichePoste', fichesPosteAsJson);
          formData.append('multipartFile', this.file);
          this.fichesPosteService.create(formData).subscribe(
            (response) => {
              if (this.fichesPostes.length !== this.recordsPerPage) {
                this.fichesPostes.push(response.body!);
                this.fichesPostes = this.fichesPostes.slice();
              }
              this.showMessage({
                severity: 'success',
                summary: 'Succès',
                detail: 'Fiche de poste créée avec succès',
                life: 3000,
              });

              // Close the dialog after creating the fiche de poste
              this.dialogRef.close(response);
              this.dialogRef.close();
            },
            (error) => this.handleError(error)
          );
        }

        this.fichesPostes = [...this.fichesPostes];
        this.showDialog = false;
        this.fichesPoste = {};
      }
    }
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

findIndexById(id: any): number {
  let index = -1;
  for (let i = 0; i < this.fichesPostes.length; i++) {
      if (this.fichesPostes[i].id === id) {
          index = i;
          break;
      }
  }

  return index;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

onEdit(fichesPoste?: FichesPoste) {
  if (fichesPoste) this.selection = fichesPoste;
  this.clearDialogMessages();
  this.fichesPoste = Object.assign({}, this.selection);
  this.showDialog = true;
}
edit() {
  this.clearDialogMessages();
  this.isDialogOpInProgress = true;
  this.fichesPosteService.update(this.fichesPoste).subscribe(response => {
    if (this.fichesPostes.length !== this.recordsPerPage) {
      this.fichesPostes.push(response.body!);
      this.fichesPostes = this.fichesPostes.slice();
    }
    this.totalRecords++;
    this.isDialogOpInProgress = false;
    this.showDialog = false;
    this.showMessage({ severity: 'success', summary: 'Fiche de poste modifiée avec succès' });
  }, error => this.handleError(error));
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

onDownload(fichesPoste?: FichesPoste){
  if (fichesPoste) this.selection = fichesPoste;
  this.fichesPoste = Object.assign({}, this.selection);
  // this.showDialog = true;
  this.downloadFiche(this.fichesPoste);
}

downloadFiche(fichesPoste?: FichesPoste){
  this.fichesPosteService.downloadFile(fichesPoste?.url!).subscribe(
    blob => saveAs(blob, fichesPoste?.libelle)
  );
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // saveEntity(): void {
  //   this.clearDialogMessages();
  //   this.isDialogOpInProgress = true;
  //   if (this.fichesPoste) {
  //     if (this.fichesPoste.id) {
  //       this.fichesPosteService.update(this.fichesPoste).subscribe(
  //         {
  //           next: (response) => {
  //             this.dialogRef.close(response);
  //             this.dialogRef.destroy();
  //             this.showMessage({ severity: 'success', summary: 'fichesPoste modifié avec succès' });
             
  //           },
  //           error: (error) => {
  //             console.error("error" + JSON.stringify(error));
  //             this.isOpInProgress = false;
  //             this.showMessage({ severity: 'error', summary: error.error.message });

  //           }
  //         });
  //     } else {
  //       this.fichesPosteService.create(this.fichesPoste).subscribe({
  //         next: (response) => {
  //           this.dialogRef.close(response);
  //           this.dialogRef.destroy();
  //           this.showMessage({
  //             severity: 'success',
  //             summary: 'fichesPoste creer avec succès',
  //           });
  //         },
  //         error: (error) => {
  //           console.error("error" + JSON.stringify(error));
  //           this.isOpInProgress = false;
  //           this.showMessage({ severity: 'error', summary: error.error.message });

  //         }
  //       });
  //     }
  //   }
  // }

}
