import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, Message } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPointage } from 'src/app/shared/model/pointage.model';
import { FonctionnaireService } from 'src/app/shared/service/fonctionnaire.service';
import { PointageService } from 'src/app/shared/service/pointage.service';

@Component({
    selector: 'app-ajout-modifier-pointage',
    templateUrl: './ajout-modifier-pointage.component.html',
    styleUrls: ['./ajout-modifier-pointage.component.scss'],
})
export class AjoutModifierPointageComponent {
    @ViewChild('dtf') form!: NgForm;
    selectedFonctionnaire: any;
    selectedFile: File | null = null;
    error: string | undefined;
    showDialog = false;
    isDialogOpInProgress!: boolean;
    message: any;
    dialogErrorMessage: any;
    timeoutHandle: any;
    isOpInProgress!: boolean;
    pointage: IPointage = {
        dateControle: new Date().toISOString().substring(0, 10),
        heureControle: new Date().toTimeString().substring(0, 5),
        lieuControle: '',
        dureeAbsenceH: 1,
        dureeAbsenceJ: 0,
        statutControle: 'PRESENT',
        typePointage: 1,
        agentId: 0,
        agentDTO: {
            id: 0,
            matricule: '',
        },
    };
    agent_id: number = 0;
    constructor(
        private pointageService: PointageService,
        private dialogRef: DynamicDialogRef,
        private dynamicDialog: DynamicDialogConfig
    ) {
        // Récupérer le fonctionnaire et le pointage si présents
        const data = this.dynamicDialog.data;
        this.selectedFonctionnaire = data?.fonctionnaire || data;
        this.agent_id =
            this.selectedFonctionnaire?.id ||
            this.selectedFonctionnaire?.agent_id;

        // Si un pointage est passé, on est en modification
        if (data?.pointage?.id) {
            this.pointage = data.pointage;
            console.log('Pointage à modifier :', this.pointage);
            //   this.pointage = { ...data.pointage };
        }
    }
    clear(): void {
        this.form.resetForm();
        this.dialogRef.close();
        this.dialogRef.destroy();
    }
    isEditing() {
        return !!this.pointage.id;
    }

    // control de champ
    // ...existing code...
    isFormValid(): boolean {
        if (
            !this.pointage.dateControle ||
            !this.pointage.heureControle ||
            !this.pointage.lieuControle
        ) {
            return false;
        }
        if (this.pointage.statutControle === 'ABSENT') {
            if (
                !this.pointage.dureeAbsenceH
                // this.pointage.justification.trim() === ''
            ) {
                return false;
            }
        }
        if (this.pointage.statutControle === 'ABSENT_JUSTIFIE') {
            if (
                !this.pointage.dureeAbsenceH ||
                this.pointage.justification == null ||
                this.pointage.justification.length < 10
            ) {
                return false;
            }
        }
        return true;
    }
    // ...existing code...

    clearDialogMessages() {
        this.dialogErrorMessage = null;
    }
    // Errors
    handleError(error: HttpErrorResponse) {
        console.error(`Processing Error: ${JSON.stringify(error)}`);
        this.isDialogOpInProgress = false;
        this.dialogErrorMessage = error.error;
    }

    showMessage(message: Message) {
        this.message = message;
        this.timeoutHandle = setTimeout(() => {
            this.message = null;
        }, 5000);
    }

  saveOrUpdatePointage() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.pointage.agentId = this.selectedFonctionnaire?.id;

    if (!this.isFormValid()) {
        this.isDialogOpInProgress = false;
        this.showMessage({
            severity: 'error',
            summary: 'Veuillez remplir tous les champs requis !',
        });
        return;
    }

    // Gestion durée
    if (this.pointage.dureeAbsenceH && this.pointage.dureeAbsenceH >= 8) {
        this.pointage.dureeAbsenceH = 0;
        this.pointage.dureeAbsenceJ = 1;
    }

    if (this.pointage.agentDTO) {
        this.pointage.agentDTO.id = this.selectedFonctionnaire?.id;
        this.pointage.agentDTO.matricule = this.selectedFonctionnaire?.matricule;
    }

    if (this.isEditing()) {
        this.pointageService
            .updatePointage(this.pointage, this.selectedFile || undefined)
            .subscribe(
                (response) => {
                    this.isDialogOpInProgress = false;
                    this.dialogRef.close(response);
                    this.dialogRef.destroy();
                    this.showMessage({
                        severity: 'success',
                        summary: 'Le pointage a été modifié avec succès !',
                    });
                },
                (error) => {
                    this.handleError(error);
                    this.showMessage({
                        severity: 'error',
                        summary:
                            "La modification a échoué. Veuillez réessayer. " +
                            error,
                    });
                }
            );
    } else {
          console.log("::::::::::::::::::::::::LE POINTAGE::::::::::::",this.agent_id, this.pointage, this.selectedFile)
        this.pointageService
      
            .createPointage(this.agent_id, this.pointage, this.selectedFile || undefined)
            .subscribe(
                (response) => {
                    this.isDialogOpInProgress = false;
                    this.dialogRef.close(response);
                    this.dialogRef.destroy();
                    this.showMessage({
                        severity: 'success',
                        summary: 'Le pointage a été créé avec succès !',
                    });
                },
                (error) => {
                    this.handleError(error);
                    this.showMessage({
                        severity: 'error',
                        summary:
                            "La création a échoué. Veuillez réessayer. " + error,
                    });
                }
            );
    }
}


    onDureeHeureChange() {
        // Arrondir à l'entier inférieur si décimal
        if (this.pointage.dureeAbsenceH) {
            this.pointage.dureeAbsenceH = Math.floor(
                this.pointage.dureeAbsenceH
            );

            // Limiter à 8 maximum
            if (this.pointage.dureeAbsenceH > 8) {
                this.pointage.dureeAbsenceH = 8;
            }
            if (this.pointage.dureeAbsenceH < 0) {
                this.pointage.dureeAbsenceH = 0;
            }
        }

        // Calcul automatique des jours
        if (this.pointage.dureeAbsenceH && this.pointage.dureeAbsenceH >= 8) {
            this.pointage.dureeAbsenceJ = Math.floor(
                this.pointage.dureeAbsenceH / 8
            );
        } else {
            this.pointage.dureeAbsenceJ = 0;
        }
    }
    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];
        } else {
            this.selectedFile = null;
        }
    }
}
