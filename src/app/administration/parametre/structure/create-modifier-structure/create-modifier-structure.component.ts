import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { cloneDeep } from 'lodash';
import { ConfirmationService, Message } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IStructure, Structure } from 'src/app/shared/model/structure';
import { StructureService } from 'src/app/shared/service/structure.service';
import { NgForm } from '@angular/forms';
import { IMinistere } from 'src/app/shared/model/ministere';
import { MinistereService } from 'src/app/shared/service/ministere.service';
@Component({
  selector: 'app-create-modifier-structure',
  templateUrl: './create-modifier-structure.component.html',
  styleUrls: ['./create-modifier-structure.component.scss']
})
export class CreateModifierStructureComponent {
  @ViewChild('dtf') form!: NgForm;
   structure: IStructure = new Structure() ;
    @Input() data: IStructure = new Structure();
    structures: IStructure[]=[];
   // parents: ICategorie[]=[];
    error: string | undefined;
    showDialog = false;
    isDialogOpInProgress!: boolean;
    message: any;
    dialogErrorMessage: any;
    timeoutHandle: any;
    isOpInProgress!: boolean;

    ministeres: IMinistere[] = [];
filteredStructures: IStructure[] = [];
  
    constructor(
      private structureService: StructureService,
          private ministereService: MinistereService,
      private dialogRef: DynamicDialogRef,
      private dynamicDialog: DynamicDialogConfig,
      private confirmationService: ConfirmationService
    ) { }
  
   ngOnInit(): void {
  if (this.dynamicDialog.data) {
    this.structure = cloneDeep(this.dynamicDialog.data);
  }

 this.loadMinisteres();
  this.loadStructures();

  // Pour vérification (optionnel)
  setTimeout(() => {
    console.log('Ministère sélectionné :', this.structure.ministere);
    console.log('Structure parente sélectionnée :', this.structure.parent);
  }, 1000); // attendre les requêtes}
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
      return !!this.structure.id;
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
      if (this.structure) {
        if (this.structure.id) {
          this.structureService.update(this.structure).subscribe(
            {
              next: (response) => {
                this.dialogRef.close(response);
                this.dialogRef.destroy();
                this.showMessage({ severity: 'success', summary: 'structure modifié avec succès' });
  
              },
              error: (error) => {
                console.error("error" + JSON.stringify(error));
                this.isOpInProgress = false;
                this.showMessage({ severity: 'error', summary: error.error.message });
  
              }
            });
        } else {
          console.log(":::::::::::::::STRUCTURE A ENVOYE::::::::::::", this.structure)
          this.structureService.create(this.structure).subscribe({
            next: (response) => {
              this.dialogRef.close(response);
              this.dialogRef.destroy();
              this.showMessage({
                severity: 'success',
                summary: 'structure creer avec succès',
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


/*    loadMinisteres() {
  this.ministereService.getAll().subscribe(response => {
    console.log("LES MINISTERES A CHARGER::::::::::::::::", response.ministeres);
    this.ministeres = response.ministeres ?? [];
  });
} */

/* loadMinisteres() {
  this.ministereService.getAll().subscribe(response => {
    this.ministeres = response.ministeres ?? [];

    if (this.structure.ministere?.id) {
      const matched = this.ministeres.find(m => m.id === this.structure.ministere?.id);
      this.structure.ministere = matched ?? null;
    }

    this.loadStructures();
  });
} */


  loadMinisteres() {
  this.ministereService.getAll().subscribe(response => {
    this.ministeres = response.ministeres ?? [];
if (this.structure?.ministere?.id) {
  const ministereRef = this.ministeres.find(m => m.id === this.structure!.ministere!.id);
  this.structure.ministere = ministereRef ?? null;
  console.log('Ministère sélectionné :', this.structure.ministere);
} else {
  console.log('Ministère non défini dans la structure');
}

  });
}



/* loadStructures() {
  this.structureService.findAll().subscribe(res => {
    this.structures = res.body ?? [];
    this.filterStructuresByMinistere();

    // Rematch parent if needed
    if (this.structure.parent?.id) {
      const matched = this.filteredStructures.find(s => s.id === this.structure.parent?.id);
      this.structure.parent = matched ?? null;
    }
  });
} */

 /*  loadStructures() {
  this.structureService.findAll().subscribe(res => {
    this.structures = res.body ?? [];
    this.filterStructuresByMinistere();

    if (this.structure.parent?.id) {
      const matched = this.filteredStructures.find(s => s.id === this.structure.parent?.id);
      this.structure.parent = matched ?? null;
    }
  });
} */


loadStructures() {
  this.structureService.findAll().subscribe(res => {

    
    this.structures = res.body ?? [];
console.log('Structure récupérée depuis le backend:', this.structure);

    // Filtrer les structures selon le ministère
    this.filterStructuresByMinistere();
if (this.structure?.parent?.id) {
  const parentRef = this.structures.find(s => s.id === this.structure!.parent!.id);
  this.structure.parent = parentRef ?? null;
  console.log('Structure parente sélectionnée :', this.structure.parent);
} else {
  console.log('Pas de structure parente définie');
}

  });
}


compareMinistere(m1: IMinistere, m2: IMinistere): boolean {
  return m1 && m2 ? m1.id === m2.id : m1 === m2;
}


filterStructuresByMinistere() {
  if (this.structure.ministere?.id) {
    console.log("Filtrage par ministère ID:", this.structure.ministere.id);
    console.log("Structures disponibles:", this.structures);

    this.filteredStructures = this.structures.filter(
      s => s.ministere?.id === this.structure.ministere?.id
    );
    console.log("Structures filtrées:", this.filteredStructures);
  } else {
    this.filteredStructures = [];
  }
}


onMinistereChange(selectedMinistere: IMinistere): void {
  this.structure.ministere = selectedMinistere;

  this.structureService.getStructuresByMinistereId(selectedMinistere.id!).subscribe({
    next: (structures) => {
      this.filteredStructures = structures;

      // Si un parent est déjà sélectionné, on essaye de le réassocier s’il est dans la nouvelle liste
      if (this.structure.parent) {
        const matched = this.filteredStructures.find(s => s.id === this.structure.parent?.id);
        this.structure.parent = matched ?? null;
      }
    },
    error: (err) => {
      console.error("Erreur lors de la récupération des structures du ministère :", err);
    }
  });
}


}