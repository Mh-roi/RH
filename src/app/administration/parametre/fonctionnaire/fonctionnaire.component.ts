import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import {
    CURRENT_PAGE,
    MAX_SIZE_PAGE,
} from 'src/app/shared/constants/pagination.constants';
import {
    IFonctionnaire,
    Fonctionnaire,
} from 'src/app/shared/model/fonctionnaire';
import { FonctionnaireService } from 'src/app/shared/service/fonctionnaire.service';
import { environment } from 'src/environments/environment';
import { CreerModifierFonctionnaireComponent } from './creer-modifier-fonctionnaire/creer-modifier-fonctionnaire.component';
import { DetailFonctionnaireComponent } from './detail-fonctionnaire/detail-fonctionnaire.component';
import { IAgent } from 'src/app/shared/model/agent';
import { AgentService } from 'src/app/shared/service/agent.service';

@Component({
    selector: 'app-fonctionnaire',
    templateUrl: './fonctionnaire.component.html',
    styleUrls: ['./fonctionnaire.component.scss'],
})
export class FonctionnaireComponent {
    onDisable(_t72: any) {
        throw new Error('Method not implemented.');
    }

    routeData: Subscription | undefined;
    fonctionnaireListSubscription: Subscription | undefined;
    fonctionnaires: IFonctionnaire[] = [];
    agents: IAgent[] = [];
    fonctionnaire: IFonctionnaire = new Fonctionnaire();
    timeoutHandle: any;
    totalRecords: number = 0;
    recordsPerPage = environment.recordsPerPage;
    enableBtnInfo = true;
    enableBtnEdit = true;
    enableBtnDelete = false;
    enableBtnDisable = true;
    enableCreate = true;
    isLoading!: boolean;
    isOpInProgress!: boolean;
    isDialogOpInProgress!: boolean;
    showDialog = false;
    regionDetail: boolean = false;
    message: any;
    dialogErrorMessage: any;
    page = CURRENT_PAGE;
    previousPage?: number;
    maxSize = MAX_SIZE_PAGE;
    //itemsPerPage = ITEMS_PER_PAGE2;
    predicate!: string;
    ascending!: boolean;
    reverse: any;
    filtreLibelle: string = '';

    constructor(
        private fonctionnaireService: FonctionnaireService,
        private agentService: AgentService,
        private activatedRoute: ActivatedRoute,
        private dialogService: DialogService,
        private dialogRef: DynamicDialogRef,
        private router: Router,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(() => {
            //  this.loadAll();
   this.loadAll({ first: 0, rows: this.recordsPerPage });
        });
    }


    ngOnDestroy(): void {
        if (this.routeData) {
            this.routeData.unsubscribe();
            if (this.fonctionnaireListSubscription) {
                this.fonctionnaireListSubscription.unsubscribe();
            }
        }
    }

    filtrer(): void {
        if (this.filtreLibelle) {
            console.log("==============================filtrelibelle==========================",this.filtreLibelle)
            this.fonctionnaireService
                .getFonctionnaireByMatricules(this.filtreLibelle)
                .subscribe(
                    (fonctionnaire) => {
                        console.log(
                            'le fonctionnaire trouvé::::::::::::::::::',
                            fonctionnaire
                        );
                        // Remplace les données existantes par le fonctionnaire trouvé
                       // this.fonctionnaires = [fonctionnaire];
                       this.agents = [fonctionnaire]; // au lieu de this.fonctionnaires

                        this.totalRecords = 1; // Puisqu'il n'y a qu'un résultat
                    },
                    (error) => {
                        console.error(
                            "Erreur lors de l'application du filtre",
                            error
                        );
                        // Optionnel : ajoutez une gestion des erreurs utilisateur
                        this.fonctionnaires = [];
                        this.totalRecords = 0;
                    }
                );
        } else {
            console.warn('Le champ de filtrage est vide.');
        }
    }

    /*filtrer(): void {
        this.loadAll();
      }*/

    resetFilter(): void {
        this.filtreLibelle = '';
        this.loadAll(); // Charge tous les fonctionnaires sans filtre
    }

   /* loadPage(event: any): void {
        if (event) {
            this.page = event.first / event.rows + 1;
            this.recordsPerPage = event.rows;
        }
        this.transition();
    }*/

        loadPage(event?: any): void {
  if (event) {
    this.page = event.first / event.rows;
    this.recordsPerPage = event.rows;
  }
  this.loadAll();
}

    transition(): void {
        this.router.navigate(['./'], {
            relativeTo: this.activatedRoute.parent,
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
            },
        });
        this.loadAll();
    }

  loadAll(event?: LazyLoadEvent): void {
  this.isOpInProgress = true;

  // Récupération des infos de pagination/tri depuis PrimeNG
  const page = event ? Math.floor((event.first ?? 0) / (event.rows ?? this.recordsPerPage)) : this.page;
  const size = event?.rows ?? this.recordsPerPage;
  const sortField = event?.sortField ?? 'id';
  const sortOrder = event?.sortOrder === 1 ? 'asc' : 'desc';

  const req: any = {
    page: page,
    size: size,
    sort: [`${sortField},${sortOrder}`],
  };

  if (this.filtreLibelle) {
    req.libelle = this.filtreLibelle;
  }

  this.agentService.listAgentsPagination(req).subscribe({
    next: (response) => {
      this.agents = response.body || [];
      this.totalRecords = Number(response.headers.get('X-Total-Count'));
      this.isOpInProgress = false;
    },
    error: (err) => {
      console.error('Erreur de chargement des agents', err);
      this.isOpInProgress = false;
    },
  });
}

  /*  loadAgents() {
        this.agentService.listAgentsPagination().subscribe(
            (response) => {
                this.agents = response.body!;
                console.log('Agents chargés:', this.agents);
                this.totalRecords = response.body?.length || 0;
            },
            (error) => {
                this.message = { severity: 'error', summary: error.error };
                console.error(JSON.stringify(error));
            }
        );
    }*/


   

    sortMethod(): string[] {
        this.predicate = 'id';
        this.reverse = true;
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        return result;
    }

    buildReq(): any {
        let req = {
            page: this.page - 1,
            size: this.recordsPerPage,
            sort: this.sortMethod(),
        };
        let obj: any;
        if (this.filtreLibelle) {
            obj = {};
            obj['libelle.contains'] = this.filtreLibelle;
            req = Object.assign({}, req, obj);
        }
        return req;
    }

    /** Permet d'afficher un modal pour l'ajout */
    openModalCreate(): void {
        this.dialogService
            .open(CreerModifierFonctionnaireComponent, {
                header: 'Ajouter un fonctionnaire',
                width: '80%',
                contentStyle: { overflow: 'auto' },
                baseZIndex: 10000,
                maximizable: true,
                closable: true,
            })
            .onClose.subscribe((result) => {
                if (result) {
                    this.fonctionnaires.push(result.body);
                    this.isDialogOpInProgress = false;
                    this.showMessage({
                        severity: 'success',
                        summary: 'fonctionnaire creer avec succès',
                    });
                }
            });
    }

    /** Permet d'afficher un modal pour la modification */
    openModalEdit(fonctionnaire: IFonctionnaire): void {
        this.dialogService
            .open(CreerModifierFonctionnaireComponent, {
                header: 'Modifier un fonctionnaire',
                width: '80%',
                contentStyle: { overflow: 'auto' },
                baseZIndex: 10000,
                maximizable: true,
                closable: true,
                data: fonctionnaire,
            })
            .onClose.subscribe((result) => {
                if (result) {
                    this.isDialogOpInProgress = false;
                    this.loadAll();
                    this.showMessage({
                        severity: 'success',
                        summary: 'fonctionnaire modifié avec succès',
                    });
                }
            });
    }

    /** Permet d'afficher un modal pour voir les détails */
    openModalDetail(fonctionnaire: IFonctionnaire): void {
        this.dialogService.open(DetailFonctionnaireComponent, {
            header: 'Details de fonctionnaire',
            width: '60%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            data: fonctionnaire,
        });
    }

    // Suppression
    onDelete(fonctionnaire: IFonctionnaire) {
        this.confirmationService.confirm({
            message: 'Etes-vous sur de vouloir supprimer ce fonctionnaire?',
            accept: () => {
                this.delete(fonctionnaire);
            },
        });
    }

    delete(selection: any) {
        this.isOpInProgress = true;
        this.fonctionnaireService.delete(selection.id).subscribe(
            () => {
                this.fonctionnaires = this.fonctionnaires.filter(
                    (fonctionnaire) => fonctionnaire.id !== selection.id
                );
                selection = null;
                this.isOpInProgress = false;
                this.totalRecords--;
                this.showMessage({
                    severity: 'success',
                    summary: 'fonctionnaire supprimé avec succès',
                });
            },
            (error) => {
                console.error('commune ' + JSON.stringify(error));
                this.isOpInProgress = false;
                this.showMessage({
                    severity: 'error',
                    summary: error.error.message,
                });
            }
        );
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

    onDisableAccount(_t72: any) {
        throw new Error('Method not implemented.');
    }
}
