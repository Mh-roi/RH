import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { forkJoin } from 'rxjs';
import { Agent, IAgent } from 'src/app/shared/model/agent';
import { IPointage } from 'src/app/shared/model/pointage.model';
import { AgentService } from 'src/app/shared/service/agent.service';
import { PointageService } from 'src/app/shared/service/pointage.service';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';

@Component({
    selector: 'app-justification-absence',
    templateUrl: './justification-absence.component.html',
    styleUrls: ['./justification-absence.component.scss'],
})
export class JustificationAbsenceComponent {
    message: any;
    agents: any[] = [];
    selectedAgent: IAgent | null = null;
    startDate: Date | null = null;
    endDate: Date | null = null;
    filteredPointages: any[] = [];
    loading = false;
    selectedPointages: any[] = [];
    justification = {
        comment: '',
        reference: '',
        document: null,
    };
    uploadedFile: any;
    error: string | undefined;
    showDialog = false;
    isDialogOpInProgress!: boolean;
    dialogErrorMessage: any;
    timeoutHandle: any;
    isOpInProgress!: boolean;
    selectedFile: File | null = null;
    constructor(
        private pointageService: PointageService,
        private messageService: MessageService,
        private dialogRef: DynamicDialogRef,
        private confirmationService: ConfirmationService,
        private agentService: AgentService,
        private tokenStorage: TokenStorageService
    ) {}
    ngOnInit() {
        /* this.agentService.getAllAgent().subscribe((response) => {
            this.agents = response.body || [];
        }); */
        this.load();
    }
    onAgentChange() {
        this.startDate = null;
        this.endDate = null;
        this.filteredPointages = [];
    }
    // Errors
    handleError(error: HttpErrorResponse) {
        console.error(`Processing Error: ${JSON.stringify(error)}`);
        this.isDialogOpInProgress = false;
        this.dialogErrorMessage = error.error?.title;
    }
    // Messages

    clearDialogMessages() {
        this.dialogErrorMessage = null;
    }

    showMessage(message: Message) {
        this.message = message;
        this.timeoutHandle = setTimeout(() => {
            this.message = null;
        }, 5000);
    }
    /// récupérer les agents
    load(): void {
        console.log(
            '==================== agents ==================================== '
        );

        const user = this.tokenStorage.getUser();

        if (user && user.matricule) {
            const matricule = user.matricule;
            this.agentService.getAgentsBySuperieur(matricule).subscribe({
                next: (agents) => {
                    this.agents = agents;
                    //  this.filteredPointages = agents;
                    console.log('les agents à charger', agents);
                },
                error: (err) => {
                    console.error(
                        'Erreur lors de la récupération des agents du supérieur',
                        err
                    );
                },
            });
        } else {
            console.warn(
                'Aucun utilisateur connecté trouvé ou matricule manquant'
            );
        }
    }
    /**
     * Annule la justification et réinitialise le formulaire
     */
    cancel(): void {
        this.selectedAgent = null;
        this.startDate = null;
        this.endDate = null;
        this.selectedFile = null;
        this.selectedPointages = [];
        this.justification = {
            comment: '',
            reference: '',
            document: null,
        };
        this.uploadedFile = null;
        this.filteredPointages = [];
        this.message = null;

        this.messageService.add({
            severity: 'info',
            summary: 'Annulation',
            detail: 'Le formulaire est réinitialisé',
        });
    }

    /**
     * Gère la sélection de fichier
     */
    onFileSelect(event: any): void {
        if (event.files && event.files.length > 0) {
            this.uploadedFile = event.files[0];
            this.justification.document = this.uploadedFile.name;
            this.selectedFile = event.files[0];
            // Vérification de la taille du fichier (max 5MB)
            if (this.uploadedFile.size > 5000000) {
                this.message = {
                    severity: 'error',
                    summary: 'Fichier trop volumineux (max 5MB)',
                };
                this.uploadedFile = null;
                this.selectedFile = null;
                this.justification.document = null;
            }
        }
    }

    /**
     * Gère l'annulation de la sélection de fichier
     */
    onFileClear(): void {
        this.uploadedFile = null;
        this.justification.document = null;
    }

    /**
     * Retourne le libellé lisible pour un statut de pointage
     */
    getStatusLabel(status: string): string {
        const statusLabels: { [key: string]: string } = {
            present: 'Présent',
            absent: 'Absent',
            absent_j: 'Absence justifiée',
            late: 'Retard',
            early_departure: 'Départ anticipé',
        };

        return statusLabels[status] || status;
    }
    //charger pointages
    getPointagesByAgent() {
        this.pointageService.getPointages().subscribe({
            next: (data) => {
                this.filteredPointages = data.filter((p) => {
                    return p.agentDTO?.id === this.selectedAgent?.id;
                });
                console.log(
                    'les pointages --- justification',
                    this.filteredPointages
                );
                console.log('agent selectionné:', this.selectedAgent);
            },
            error: (err) => {
                console.error('Erreur chargement pointages :', err);
                this.loading = false;
            },
        });
    }
    chargerPointagesStatiques() {
        /* this.filteredPointages = [
            {
                id: 1,
                date_controle: '2025-05-20',
                heure_controle: '08:10',
                statut_controle: 'present',
                lieu_controle: 'Siège central',
                type_pointage: 1,
                agent_id: 101,
            },
            {
                id: 2,
                date_controle: '2025-05-20',
                heure_controle: '08:15',
                statut_controle: 'absent',
                lieu_controle: 'Direction RH',
                justification: 'Maladie',
                reference_piece: 'CM-2025-123',
                piece_justificative: 'justif1.pdf',
                duree_absence_J: 1,
                duree_absence_H: 0,
                type_pointage: 1,
                agent_id: 102,
            },
            {
                id: 3,
                date_controle: '2025-05-20',
                heure_controle: '08:25',
                statut_controle: 'absent_j',
                lieu_controle: 'DRH',
                justification: 'Mission officielle',
                reference_piece: 'MO-2025-034',
                piece_justificative: 'mission.pdf',
                duree_absence_J: 3,
                type_pointage: 1,
                agent_id: 103,
            },
            {
                id: 4,
                date_controle: '2025-05-19',
                heure_controle: '08:00',
                statut_controle: 'present',
                lieu_controle: 'Annexe B',
                type_pointage: 1,
                agent_id: 104,
            },
            {
                id: 5,
                date_controle: '2025-05-18',
                heure_controle: '08:17',
                statut_controle: 'absent',
                lieu_controle: 'Siège',
                justification: 'Problème familial',
                duree_absence_H: 4,
                type_pointage: 1,
                agent_id: 105,
            },
        ]; */
        //  this.selectedPointages = this.filteredPointages.length;
    }
    loadPointages() {
        if (!this.selectedAgent || !this.startDate || !this.endDate) return;

        this.loading = true;
        this.pointageService
            .getByAgentAndPeriod(
                this.selectedAgent.id,
                this.startDate,
                this.endDate
            )
            .subscribe((pointages) => {
                this.filteredPointages = pointages;
                this.loading = false;
            });
    }

    //update pointages
    updateAllPointagestoJustify() {
        this.isDialogOpInProgress = true;

        // Créer un tableau d'observables
        const updateObservables = this.selectedPointages.map((pointage) => {
            pointage.justification = this.justification.comment;
            pointage.reference_piece = this.justification.reference;
            pointage.piece_justificative = this.uploadedFile
                ? this.uploadedFile.name
                : null;
            pointage.statutControle = 'ABSENT_JUSTIFIE';

            // Retourner l'observable
            return this.pointageService.updatePointage(pointage);
        });

        // Exécuter toutes les mises à jour en parallèle
        forkJoin(updateObservables).subscribe({
            next: () => {
                this.showMessage({
                    severity: 'success',
                    summary:
                        'Tous les pointages ont été justifiés avec succès !',
                });
                this.dialogRef.close(true);
            },
            error: (error) => {
                this.handleError(error);
                this.showMessage({
                    severity: 'error',
                    summary: 'Certaines justifications ont échoué',
                    detail: error.message,
                });
            },
            complete: () => {
                this.isDialogOpInProgress = false;
            },
        });
    }

    submitJustification() {
        const justificationData = {
            agentId: this.selectedAgent?.id,
            pointageIds: this.selectedPointages.map((p) => p.id),
            comment: this.justification.comment,
            reference: this.justification.reference,
            document: this.uploadedFile,
        };
        console.log('Justification data:', justificationData);
        console.log('Selected pointages:', this.selectedPointages);
        // Appel du service pour enregistrer la justification
        this.pointageService.pointagesJustify(justificationData).subscribe({
            next: () =>
                this.showSuccess('Justification enregistrée avec succès'),
            error: () => this.showError("Erreur lors de l'enregistrement"),
        });
    }

    showSuccess(arg0: string): void {
        this.messageService.add({
            severity: 'success',
            summary: arg0,
        });
    }

    showError(message: string): void {
        this.messageService.add({
            severity: 'error',
            summary: message,
        });
    }
    clear(): void {
        this.dialogRef.close();
        this.dialogRef.destroy();
    }
}
