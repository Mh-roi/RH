import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IAgent } from 'src/app/shared/model/agent';
import { Fiche, StatutFiche, TypeFiche } from 'src/app/shared/model/fiche';
import { IReclamation } from 'src/app/shared/model/reclamation';
import { PointageService } from 'src/app/shared/service/pointage.service';
import { ReclamationService } from '../shared/service/reclamation.service';
import { TokenStorageService } from '../shared/service/token-storage.service';
import { AgentService } from '../shared/service/agent.service';

@Component({
    selector: 'app-reclamation',
    templateUrl: './reclamation.component.html',
    styleUrls: ['./reclamation.component.scss'],
})
export class ReclamationComponent {
    agents: any[] = [
        /* { nom: 'François', prenom: 'Dupont', id: 1, matricule: '123456' },
        { nom: 'François', prenom: 'Dupont', id: 2, matricule: '123456' },
        { nom: 'François', prenom: 'Dupont', id: 3, matricule: '123456' },
        { nom: 'François', prenom: 'Dupont', id: 4, matricule: '123456' },
    */
    ];
    selectedAgent: IAgent | null = null;
    startDate: Date | null = null;
    endDate: Date | null = null;
    filteredPointages: any[] = [];
    loading = false;
    selectedPointages: any[] = [];
    reclamation: IReclamation = {};
    uploadedFile: any;
    error: string | undefined;
    showDialog = false;
    isDialogOpInProgress!: boolean;
    dialogErrorMessage: any;
    timeoutHandle: any;
    fiche: any;
    isOpInProgress!: boolean;
    selectedFile: File | null = null;
    message: { severity: string; summary: string } | null = null;
    constructor(
        private pointageService: PointageService,
        private agentService: AgentService,
        private tokenStorage: TokenStorageService,
        private reclamationService: ReclamationService,
        private messageService: MessageService,
        private dialogRef: DynamicDialogRef,
        private dynamicDialog: DynamicDialogConfig,
        private confirmationService: ConfirmationService
    ) {
        this.fiche = this.dynamicDialog.data;
        console.log('fiche à reclamer:', this.fiche);
    }
    ngOnInit() {
       
        this.load();
    }
    onAgentChange() {
        this.startDate = null;
        this.endDate = null;
        this.filteredPointages = [];
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
        this.reclamation = {
            sujet: '',
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
            this.reclamation.pieceJustificative = this.uploadedFile.name;
            this.selectedFile = event.files[0];
            // Vérification de la taille du fichier (max 5MB)
            if (this.uploadedFile.size > 5000000) {
                this.message = {
                    severity: 'error',
                    summary: 'Fichier trop volumineux (max 5MB)',
                };
                this.uploadedFile = null;
                this.selectedFile = null;
                this.reclamation.pieceJustificative = '';
            }
        }
    }

    /**
     * Gère l'annulation de la sélection de fichier
     */
    onFileClear(): void {
        this.uploadedFile = null;
        this.reclamation.pieceJustificative = '';
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

    /// récupérer les agents
    load(): void {
        console.log(
            '==================== agents ==================================== '
        );

        const user = this.tokenStorage.getUser();

           console.log('== agents ===',user.agent.superieurHierarchique.matricule);

        if (user && user.agent.superieurHierarchique.matricule) {
            const matricule = user.agent.superieurHierarchique.matricule;
            this.agentService.getAgentsBySuperieur(matricule).subscribe({
                next: (agents) => {
                    this.agents = agents;
                    this.filteredPointages = agents;
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
    /* chargerPointagesStatiques() {
        this.filteredPointages = [
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
        ];
        //  this.selectedPointages = this.filteredPointages.length;
    } */
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

 submitReclamation() {
    if (!this.fiche) {
        this.showError("Aucune fiche sélectionnée");
        return;
    }

    console.log('id de la fiche concernée:', this.fiche.id);

    // Assigner directement l'objet fiche
    this.reclamation.ficheDTO = this.fiche.fiche;

    this.reclamation.statutReclamation = "Initié";

    console.log("::::::::::::::::reclamation à envoyer::::::::::::::::::::::::::", this.reclamation);

    this.reclamationService.createReclamation(this.reclamation).subscribe({
        next: () => {
            this.dialogRef.close();
            this.dialogRef.destroy();
            this.showSuccess('La réclamation a été enregistrée avec succès');
        },
        error: () => this.showError("Erreur lors de l'enregistrement de la réclamation"),
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
