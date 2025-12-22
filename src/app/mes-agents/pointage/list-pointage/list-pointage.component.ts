import { Component } from '@angular/core';
import {
    CURRENT_PAGE,
    MAX_SIZE_PAGE,
} from 'src/app/shared/constants/pagination.constants';
import { IPointage, PointageAgent } from 'src/app/shared/model/pointage.model';
import { PointageService } from 'src/app/shared/service/pointage.service';
import { environment } from 'src/environments/environment';
import {
    addDays,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear,
} from 'date-fns';
import { IFonctionnaire } from 'src/app/shared/model/fonctionnaire';
import { AjoutModifierPointageComponent } from '../ajout-modifier-pointage/ajout-modifier-pointage.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { JustificationAbsenceComponent } from '../justification-absence/justification-absence.component';
import { DetailPointageComponent } from '../detail-pointage/detail-pointage.component';
import { ReclamationComponent } from '../../../reclamation/reclamation.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Agent, IAgent } from 'src/app/shared/model/agent';
import { Observable, of } from 'rxjs';
@Component({
    selector: 'app-list-pointage',
    templateUrl: './list-pointage.component.html',
    styleUrls: ['./list-pointage.component.scss'],
})
export class ListPointageComponent {
    selectedFonctionnaire: IFonctionnaire | undefined;
    periodeSelectionnee: any = null;
    dateDebut: Date | null = null;
    dateFin: Date | null = null;
    pointages: IPointage[] = [];
    pointagesAgents: IPointage[] = [];
    loading = true;
    timeoutHandle: any;
    message: any;
    dialogErrorMessage: any;
    isLoading!: boolean;
    isDialogOpInProgress!: boolean;
    totalRecords!: number;
    recordsPerPage = environment.recordsPerPage;
    page = CURRENT_PAGE;
    previousPage?: number;
    maxSize = MAX_SIZE_PAGE;
    predicate!: string;
    ascending!: boolean;
    reverse: any;
    periodes = [
        { label: 'Aujourd’hui', value: 'jour' },
        { label: 'Cette semaine', value: 'semaine' },
        { label: 'Ce mois-ci', value: 'mois' },
        { label: 'Cette année', value: 'annee' },
        { label: 'Période personnalisée', value: 'personnalisee' },
    ];
    filtre: {
        libelle: { label: string; value: string } | null;
        statut: { label: string; value: string } | null;
        periode: { label: string; value: string } | null;
        dateDebut: Date | null;
        dateFin: Date | null;
    } = {
        libelle: null,
        statut: null,
        periode: null,
        dateDebut: null,
        dateFin: null,
    };

    statuts = [
        { label: 'Présent', value: 'present' },
        { label: 'Absent', value: 'absent' },
        { label: 'Justifié', value: 'justifie' },
    ];
    fonctions = [
        { label: 'Agent', value: 'agent' },
        { label: 'Chef de département', value: 'CHEF' },
        { label: 'Directeur', value: 'DT' },
        { label: 'Directeur', value: 'DC' },
        { label: 'Directeur', value: 'DR' },
    ];
    isOpInProgress: boolean = false;
    datePipe: any;
    constructor(
        private pointageService: PointageService,
        private dialogService: DialogService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        //this.chargerPointagesDuJour();
        //this.chargerPointagesStatiques();
        this.getPointages();
    }

    load() {
        throw new Error('Method not implemented.');
    }
    chargerPointagesDuJour(): void {
        this.pointageService.getPointagesDuJour().subscribe({
            next: (data) => {
                this.pointages = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Erreur chargement pointages :', err);
                this.loading = false;
            },
        });
    }
    //charger pointages
    getPointages() {
        this.pointageService.getPointages().subscribe({
            next: (data) => {
                this.pointagesAgents = data;
                console.log('les pointages', this.pointagesAgents);
            },
            error: (err) => {
                console.error('Erreur chargement pointages :', err);
                this.loading = false;
            },
        });
    }

    // charger les pointages par matricule
    getAgentByPointage(pointage: IPointage): Observable<IAgent> {
        const matricule = pointage.agentDTO?.matricule;
        if (matricule) {
            return this.pointageService.getAgentByMatricule(matricule);
        } else {
            // console.error("Le matricule de l'agent est indéfini.");
            return of({} as IAgent); // Retourne un observable vide
        }
    }
    /* chargerPointagesStatiques() {
        this.pointagesAgents = [
            {
                id: 1,
                dateControle: '2025-05-20',
                heureControle: '08:10',
                statutControle: 'PRESENT',
                lieuControle: 'Siège central',
                typePointage: 1,
                agentId: 101,
            },
            {
                id: 2,
                dateControle: '2025-05-20',
                heureControle: '08:15',
                statutControle: 'ABSENT_JUSTIFIE',
                lieuControle: 'Direction RH',
                justification: 'Maladie',
                referencePJ: 'CM-2025-123',
                pieceJustificative: 'justif1.pdf',
                dureeAbsenceJ: 1,
                dureeAbsenceH: 0,
                typePointage: 1,
                agentId: 102,
            },
            {
                id: 3,
                dateControle: '2025-05-20',
                heureControle: '08:15',
                statutControle: 'ABSENT',
                lieuControle: 'Direction RH',
                justification: 'Maladie',
                referencePJ: 'CM-2025-123',
                pieceJustificative: 'justif1.pdf',
                dureeAbsenceJ: 1,
                dureeAbsenceH: 0,
                typePointage: 1,
                agentId: 102,
            },
            {
                id: 4,
                dateControle: '2025-05-19',
                heureControle: '08:00',
                statutControle: 'PRESENT',
                lieuControle: 'Annexe B',
                typePointage: 1,
                agentId: 104,
            },
            {
                id: 5,
                dateControle: '2025-05-18',
                heureControle: '08:17',
                statutControle: 'ABSENT',
                lieuControle: 'Siège',
                justification: 'Problème familial',
                dureeAbsenceH: 4,
                typePointage: 1,
                agentId: 105,
            },
        ];
    } */

    loadPage(event: any): void {
        if (event) {
            this.page = event.first / event.rows + 1;
            this.recordsPerPage = event.rows;
        }
        this.transition();
    }

    transition(): void {
        this.router.navigate(['./'], {
            relativeTo: this.activatedRoute.parent,
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
            },
        });
        this.getPointages();
    }

    appliquerFiltre() {
        const aujourdHui = new Date();
        console.log('Filtre appliqué :', this.filtre);
        let dateDebut: Date | null = null;
        let dateFin: Date | null = null;

        switch (this.filtre.periode?.value) {
            case 'jour':
                dateDebut = dateFin = aujourdHui;
                break;
            case 'semaine':
                dateDebut = startOfWeek(aujourdHui, { weekStartsOn: 1 });
                dateFin = endOfWeek(aujourdHui, { weekStartsOn: 1 });
                break;
            case 'mois':
                dateDebut = startOfMonth(aujourdHui);
                dateFin = endOfMonth(aujourdHui);
                break;
            case 'annee':
                dateDebut = startOfYear(aujourdHui);
                dateFin = endOfYear(aujourdHui);
                break;
            case 'personnalisee':
                dateDebut = this.filtre.dateDebut;
                dateFin = this.filtre.dateFin;
                break;
        }

        this.pointagesAgents = this.pointagesAgents.filter((p) => {
            const matchLibelle =
                !this.filtre.libelle ||
                p.agentDTO?.fonction?.libelle
                    ?.toLowerCase()
                    .includes(this.filtre.libelle.value.toLowerCase());

            const matchStatut =
                !this.filtre.statut ||
                p.statutControle === this.filtre.statut.value;

            const datePointage = new Date(p.dateControle);
            const matchDate =
                !dateDebut ||
                !dateFin ||
                (datePointage >= dateDebut && datePointage <= dateFin);

            return matchStatut && matchDate;
        });
    }

    filtrerParPeriode() {
        const aujourdHui = new Date();

        switch (this.periodeSelectionnee?.value) {
            case 'jour':
                this.filtrerEntreDates(aujourdHui, aujourdHui);
                break;

            case 'semaine':
                this.filtrerEntreDates(
                    startOfWeek(aujourdHui, { weekStartsOn: 1 }),
                    endOfWeek(aujourdHui, { weekStartsOn: 1 })
                );
                break;

            case 'mois':
                this.filtrerEntreDates(
                    startOfMonth(aujourdHui),
                    endOfMonth(aujourdHui)
                );
                break;

            case 'annee':
                this.filtrerEntreDates(
                    startOfYear(aujourdHui),
                    endOfYear(aujourdHui)
                );
                break;
        }
    }

    openModalToPointer(pointage: IPointage): void {
        //this.selectedFonctionnaire = fonctionnaire;
        this.dialogService
            .open(AjoutModifierPointageComponent, {
                data: { pointage: pointage },
                header: 'Pointage du jour',
                width: '50%',
                contentStyle: { overflow: 'auto', backgroundColor: 'white' },
                baseZIndex: 10000,
                maximizable: true,
            })
            .onClose.subscribe((result) => {
                if (result) {
                    // this.isDialogOpInProgress = false;
                    this.getPointages();
                    this.showMessage({
                        severity: 'success',
                        summary: 'categorie modifié avec succès',
                    });
                }
            });
        console.log('Pointage sélectionné:', pointage);
    }
    // Errors
    handleError(error: HttpErrorResponse) {
        console.error(`Processing Error: ${JSON.stringify(error)}`);
        this.isDialogOpInProgress = false;
        this.dialogErrorMessage = error.error.title;
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
    openModalToViewPointer(pointage: IPointage): void {
        //this.selectedFonctionnaire = fonctionnaire;
        this.dialogService.open(DetailPointageComponent, {
            data: pointage,
            header: 'Détail du pointage',
            width: '50%',
            contentStyle: { overflow: 'auto', backgroundColor: 'white' },
            baseZIndex: 10000,
            maximizable: true,
        });

        console.log('Pointage sélectionné:', pointage);
    }

    confirmerSuppression(pointage: IPointage): void {
        this.confirmationService.confirm({
            message: `
            <div class="confirmation-content">
              <div class="confirmation-details">
                <h3>Annuler le pointage</h3>
                <p>Êtes-vous sûr de vouloir annuler ce pointage ?</p>
                <div class="pointage-info">
                  <div><strong>Agent:</strong> ${pointage?.agentDTO
                      ?.matricule!}</div>
            <div><strong>Date:</strong> ${
                (pointage.dateControle, 'dd/MM/yyyy')
            }</div>
            <div><strong>Heure:</strong> ${pointage.heureControle}</div>
            <div><strong>Statut:</strong> ${pointage.statutControle}</div>
                </div>
              </div>
            </div>
          `,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui, annuler',
            rejectLabel: 'Non, garder',
            acceptButtonStyleClass: 'p-button-danger',
            rejectButtonStyleClass: 'p-button-secondary',
            acceptIcon: 'pi pi-trash',
            rejectIcon: 'pi pi-times',
            defaultFocus: 'reject',
            accept: () => {
                this.rejeter(pointage);
            },
            reject: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Annulé',
                    detail: 'Opération annulée',
                    life: 3000,
                });
            },
        });
    }
    getStatusLabel(statutControle: string) {
        throw new Error('Method not implemented.');
    }

    rejeter(pointage: IPointage) {
        this.isOpInProgress = true;
        this.pointageService.deletePointage(pointage.id!).subscribe(
            () => {
                this.getPointages();
                this.isOpInProgress = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Le pointage a été retiré avec succès',
                    life: 5000,
                });
            },
            (error) => {
                console.error(JSON.stringify(error));
                this.isOpInProgress = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Echec',
                    detail: 'Le retrait a échoué',
                    life: 5000,
                });
            }
        );
    }
    // Ouvre la modal pour justifier l'absence
    openModalToJustififyAbsence(): void {
        //this.selectedFonctionnaire = fonctionnaire;
        this.dialogService
            .open(JustificationAbsenceComponent, {
                // data: { pointage: pointage },
                header: "Justification d'absence",
                width: '50%',
                contentStyle: { overflow: 'auto', backgroundColor: 'white' },
                baseZIndex: 10000,
                maximizable: true,
            })
            .onClose.subscribe((result) => {
                if (result) {
                    this.isDialogOpInProgress = false;
                    this.getPointages();
                    this.showMessage({
                        severity: 'success',
                        summary:
                            "Les pointages selectionnés de l'agent ont effectué avec succès !",
                    });
                }
            });
    }
    // Ouvre la modal pour reclamer l'absence
    openModalToReclamation(): void {
        //this.selectedFonctionnaire = fonctionnaire;
        this.dialogService.open(ReclamationComponent, {
            // data: { pointage: pointage },
            header: "Reclamation d'absence",
            width: '50%',
            contentStyle: { overflow: 'auto', backgroundColor: 'white' },
            baseZIndex: 10000,
            maximizable: true,
        });
    }
    appliquerFiltrePersonnalise() {
        if (this.dateDebut && this.dateFin) {
            this.filtrerEntreDates(this.dateDebut, this.dateFin);
        }
    }

    filtrerEntreDates(date1: Date, date2: Date) {
        this.pointagesAgents = this.pointagesAgents.filter((p) => {
            const datePointage = new Date(p.dateControle);
            return datePointage >= date1 && datePointage <= date2;
        });
    }
}
