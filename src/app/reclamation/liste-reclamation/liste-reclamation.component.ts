import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
    DialogService,
    DynamicDialogConfig,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { StatutFiche, TypeFiche } from 'src/app/shared/model/fiche';
import { IReclamation } from 'src/app/shared/model/reclamation';
import { ReclamationService } from 'src/app/shared/service/reclamation.service';
import { DetailReclamationComponent } from '../detail-reclamation/detail-reclamation.component';

@Component({
    selector: 'app-liste-reclamation',
    templateUrl: './liste-reclamation.component.html',
    styleUrls: ['./liste-reclamation.component.scss'],
})
export class ListeReclamationComponent {
    reclamations: IReclamation[] = [];
    filteredReclamations: IReclamation[] = [];
    searchTerm = '';
    statutFilter = '';
    decisionFilter = '';
    ficheId: any;
    reclamationSelected: IReclamation | null = null;
    // Nouvelle propriété dans votre composant
    decisionOptions = [
        { label: 'Favorable', value: 'Favorable', icon: 'pi pi-thumbs-up' },
        {
            label: 'Défavorable',
            value: 'Defavorable',
            icon: 'pi pi-thumbs-down',
        },
    ];
    selectedDecision: { label: string; value: string; icon: string } | null =
        null;
    decisionDialog = false;
    currentReclamation: IReclamation | null = null;

    constructor(
        private reclamationService: ReclamationService,
        private route: ActivatedRoute,
        private dynamicDialog: DynamicDialogConfig,
        private confirmationService: ConfirmationService,
        private router: Router,
        private dialogService: DialogService,
        private messageService: MessageService
    ) {
        this.ficheId = dynamicDialog.data;
    }

 ngOnInit(): void {
  console.log("LE VRAI ID ENVOYÉ :::::", this.ficheId);
  this.loadReclamationsByFiche(this.ficheId.fiche.id); 
}

    // Dans votre composant
    commentaire: string = '';

    closeDialog(): void {
        this.decisionDialog = false;
        this.selectedDecision = null;
        this.commentaire = '';
    }

    saveAsDraft(): void {
        // Implémentez la sauvegarde comme brouillon
        this.messageService.add({
            severity: 'info',
            summary: 'Brouillon enregistré',
            detail: 'La décision a été sauvegardée comme brouillon',
            life: 3000,
        });
        this.closeDialog();
    }

    openDocument(url: string): void {
        window.open(url, '_blank');
    }
    loadReclamations(): void {
        this.reclamationService.getAllReclamations().subscribe({
            next: (data) => {
                this.reclamations = data;
                this.filteredReclamations = [...data];
            },
            error: (err) => console.error('Erreur lors du chargement', err),
        });
    }
    // load reclamation by ficheId

    ficheReference: string | null = null; // nouvelle propriété

loadReclamationsByFiche(ficheId: number): void {


  this.ficheId = ficheId;

  if (!this.ficheId) {
    console.error("⚠️ Impossible de récupérer l'id de la fiche :", ficheId);
    return;
  }

  console.log("✅ ID DE LA FICHE :", this.ficheId);

  this.reclamationService.getReclamationsByFicheId(this.ficheId).subscribe({
    next: (data) => {
      this.reclamations = data;
      this.filteredReclamations = [...data];
    },
    error: (err) => {
      console.error('Erreur lors du chargement des réclamations par fiche', err);
    },
  });
}



    applyFilters(): void {
        this.filteredReclamations = this.reclamations.filter((reclamation) => {
            const matchesSearch =
                reclamation.sujet
                    ?.toLowerCase()
                    .includes(this.searchTerm.toLowerCase()) ||
                reclamation.ficheDTO?.reference
                    ?.toLowerCase()
                    .includes(this.searchTerm.toLowerCase());
            const matchesStatut = this.statutFilter
                ? reclamation.statutReclamation === this.statutFilter
                : true;
            const matchesDecision = this.decisionFilter
                ? reclamation.decision === this.decisionFilter
                : true;

            return matchesSearch && matchesStatut && matchesDecision;
        });
    }

    // Ouvre la modal pour afficher les reclamations de la liste
    openModalToTreatReclamation(reclamation: IReclamation): void {
        //this.selectedFonctionnaire = fonctionnaire;
        this.dialogService.open(ListeReclamationComponent, {
            data: { fiche: this.reclamationSelected },
            header: 'Reclamations de la fiche',
            width: '70%',
            contentStyle: { overflow: 'auto', backgroundColor: 'white' },
            baseZIndex: 10000,
            maximizable: true,
        });
        console.log('la fiche est :', this.reclamationSelected);
    }
    // Ouvre la modal pour afficher les reclamations de la liste
    openModalToViewReclamation(reclamationSelected: IReclamation): void {
        //this.selectedFonctionnaire = fonctionnaire;
        this.dialogService.open(DetailReclamationComponent, {
            data: { reclamation: reclamationSelected },
            header: 'Détail de la reclamation',
            width: '40%',
            contentStyle: { overflow: 'auto', backgroundColor: 'white' },
            baseZIndex: 10000,
            maximizable: true,
        });
    }

    //traite la reclamation
    traiterReclamation(reclamation: IReclamation): void {
        // Afficher un dialogue pour choisir la décision
        this.decisionDialog = true;
        this.currentReclamation = reclamation;
        console.log('Traitement de la réclamation.  --->:', reclamation);
        /* this.confirmationService.confirm({
            message: `Êtes-vous sûr de vouloir traiter la réclamation "${reclamation.sujet}" ?`,
            header: 'Confirmation de traitement',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Confirmer',
            rejectLabel: 'Annuler',
            acceptButtonStyleClass: 'p-button-success',
            rejectButtonStyleClass: 'p-button-danger',
            accept: () => {
                // Afficher un dialogue pour choisir la décision
                this.decisionDialog = true;
                this.currentReclamation = reclamation;
            },
        }); */
    }

    // Nouvelle méthode pour confirmer la décision
    confirmerDecision(): void {
        this.decisionDialog = true;
     
        this.currentReclamation!.decision = this.selectedDecision!.value;
        console.log(
            'Traitement de la réclamation avec décision:',
            this.currentReclamation
        );
        console.log("LA RECLAMATION QUE NOUS SOUHAITONS TRAITER::::::::::",this.currentReclamation)
        this.reclamationService
            .traiterReclamation(this.currentReclamation!)
            .subscribe({
                next: (data) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Réclamation traitée avec succès',
                        life: 3000,
                    });
                    this.loadReclamationsByFiche(this.ficheId);
                    this.openModalToViewReclamation(data);
                    this.decisionDialog = false;
                    this.selectedDecision = null;
                },
                error: (err) => {
                    console.error(
                        'Erreur lors du traitement de la réclamation',
                        err
                    );
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: 'Échec du traitement de la réclamation',
                        life: 3000,
                    });
                },
            });
    }
}
