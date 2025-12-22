import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
    ConfirmationService,
    LazyLoadEvent,
    Message,
    MessageService,
} from 'primeng/api';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Critere, ICritere } from '../shared/model/critere';

import { Note, NoteSuperieur } from '../shared/model/note';
import { CritereService } from '../shared/service/critere.service';
import {
    CURRENT_PAGE,
    MAX_SIZE_PAGE,
} from '../shared/constants/pagination.constants';
import { DetailAgentComponent } from './detail-agent/detail-agent.component';
import { DialogService } from 'primeng/dynamicdialog';
import { NoteService } from '../shared/service/note.service';
import { CreerModifierAgentComponent } from './creer-modifier-agent/creer-modifier-agent.component';
import { AjoutModifierPointageComponent } from './pointage/ajout-modifier-pointage/ajout-modifier-pointage.component';
import { PointageService } from '../shared/service/pointage.service';
import { Agent, IAgent } from '../shared/model/agent';
import { AgentService } from '../shared/service/agent.service';
import { TokenStorageService } from '../shared/service/token-storage.service';
import { IStructure } from '../shared/model/structure';
import { IFonction } from '../shared/model/fonction';
import { IEmploi } from '../shared/model/emploi';

@Component({
    selector: 'app-mes-agents',
    templateUrl: './mes-agents.component.html',
    styleUrls: ['./mes-agents.component.scss'],
})
export class MesAgentsComponent {
    @ViewChild('dtf')
    form!: NgForm;
    // fonctionnaires: Fonctionnaire[] = [];
    agents: Agent[] = [];
    listcriteres: ICritere[] = [];
    agent: Agent = {};
    notes: NoteSuperieur[] = [];
    enableCreate: boolean = true;
    enableListe: boolean = true;
    enableBtnNoter: boolean = true;
    enableBtnAttribuer: boolean = false;
    enableBtnRejeter: boolean = true;
    enableBtnPointer: boolean = true;
    recordsPerPage = environment.recordsPerPage;
    totalRecords: number = 0;
    selection: any;
    critere: Critere = {};
    template: any = [];
    showDialog = false;
    dynamicForm!: FormGroup;
    myFormGroup: FormGroup = new FormGroup({});
    isLoading: boolean = false;
    isOpInProgress: boolean = false;
    isDialogOpInProgress: boolean = false;
    timeoutHandle: any;
    message: any;
    dialogErrorMessage: any;
    page = CURRENT_PAGE;
    previousPage?: number;
    maxSize = MAX_SIZE_PAGE;
    //itemsPerPage = ITEMS_PER_PAGE2;
    predicate!: string;
    ascending!: boolean;
    reverse: any;
    filtreLibelle: string | undefined;
    showDialogAgent: boolean = false;
    noteRejetee: boolean = false;
    anneeCourante: Date = new Date();
    noteC: any = {};
    // noteT = Array<{f:Agent, n: Note}> ;
    // noteT: any[] = [Array<{f:Agent, n: Note}>] ;
    // foncNote: IFoncNote = new FoncNote();

    noteAvecCriteres: Note = {};
    noteActivite!: number;
    annee: number;
    years: number[] = [];
    selectedAgent: IAgent | undefined;

    enableBtnInfo = true;

    constructor(
        private agentService: AgentService,
        // private fonctionnaireService: FonctionnaireService,
        private critereService: CritereService,
        private noteService: NoteService,
        private pointageService: PointageService,
        private activatedRoute: ActivatedRoute,
        private dialogService: DialogService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router,
        private fb: FormBuilder,
        private http: HttpClient, // <- ajout ici
        private tokenStorage: TokenStorageService
    ) {
        this.annee = new Date().getFullYear();
        for (let year = this.annee; year >= this.annee - 9; year--) {
            this.years.push(year);
        }
    }

    ngOnInit(): void {
        this.dynamicForm = this.fb.group({
            observation: [''],
            pointDivergeance: [''],
            contraintesRealisation: [''],
            annee: [''],
            tauxActivite: [''],
            idAgent: [''],
            criteres: new FormArray([]),
        });

        this.load();
        console.log('=== Agents après load() :', this.agents);
        // this.loadCritere(this.agent.matricule!);
    }

    filtrer(): void {
        this.load();
    }

    resetFilter(): void {
        this.filtreLibelle = undefined;
        this.filtrer();
    }

    loadPage(event: any): void {
        if (event) {
            this.page = event.first / event.rows + 1;
            this.recordsPerPage = event.rows;
        }
        this.transition();
    }

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
                    this.totalRecords = agents.length;
                    this.agents.forEach((agent) => {
                        console.log(
                            'Vérification du pointage pour l’agent :',
                            agent
                        );
                        if (agent.matricule) {
                            this.pointageService
                                .verifierPointageJournalier(agent.matricule)
                                .subscribe({
                                    next: (result) => {
                                        agent.isPointed = result; // ➝ Ajoute le booléen directement dans l’agent
                                        console.log(
                                            "L'agent avec matricule",
                                            agent.matricule,
                                            'a pointé aujourd’hui :',
                                            agent.isPointed
                                        );
                                    },
                                    error: (err) => {
                                        console.error(
                                            "Erreur lors de la vérification du pointage de l'agent",
                                            agent.matricule,
                                            err
                                        );
                                        agent.isPointed = false;
                                    },
                                });
                        } else {
                            console.warn(
                                "Matricule de l'agent non défini, impossible de vérifier le pointage."
                            );
                            agent.isPointed = false;
                        }
                    });
                    console.log(
                        '=== Agents chargés depuis le backend :',
                        this.agents
                    );
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

    // Vérifier si l'agent est déjà pointé aujourd'hui
    isAgentPointedToday(matricule: string): Boolean {
        let isPointed: Boolean = false;
        this.pointageService.verifierPointageJournalier(matricule).subscribe({
            next: (result) => {
                isPointed = result;
                console.log(
                    "L'agent avec matricule",
                    matricule,
                    'a pointé aujourd’hui :',
                    isPointed
                );
            },
            error: (err) => {
                console.error(
                    "Erreur lors de la vérification du pointage de l'agent",
                    err
                );
            },
        });
        return isPointed;
    }

    /*
    load(): void {
        this.http.get<Agent[]>('assets/data/agents.json').subscribe({
            next: (data: Agent[]) => {
                this.agents = data;
                this.totalRecords = data.length;
                console.log(
                    '=== Agents chargés depuis JSON :',
                    this.agents
                );
            },
            error: (error) => {
                console.error(
                    'Erreur lors du chargement des agents JSON :',
                    error
                );
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Impossible de charger les agents depuis le fichier JSON',
                });
            },
        });
    }
*/
    // // Edit
    onEdit(agent?: Agent) {
        if (agent) {
            this.selection = agent;
            this.loadCritere(agent.profil?.id!);
        }

        this.dynamicForm.patchValue({
            idAgent: this.selection.id,
        });
        console.log('dynamicForm value', this.dynamicForm.value);

        this.clearDialogMessages();
        this.agent = Object.assign({}, this.selection);
        this.showDialog = true;
    }

    loadCritere(idFonc: number, event?: LazyLoadEvent) {
        // this.isLoading = true;
        this.t.clear();
        this.critereService.queryForNote(idFonc, event).subscribe(
            (response) => {
                // this.isLoading = false;
                this.listcriteres = response.body!;
                if (this.listcriteres.length > 0) {
                    for (let i = 0; i < this.listcriteres.length; i++) {
                        this.t.push(
                            this.fb.group({
                                id: this.listcriteres[i].id,
                                note: ['', [Validators.required]],
                            })
                        );
                    }
                }
            },
            (error) => {
                console.error(JSON.stringify(error));
            }
        );
    }

    openModalCreateAgent(): void {
        this.dialogService
            .open(CreerModifierAgentComponent, {
                header: 'Enrôler un collaborateur',
                width: '80%',
                contentStyle: { overflow: 'auto' },
                baseZIndex: 10000,
                maximizable: true,
                closable: true,
                // data: agent
            })
            .onClose.subscribe((result) => {
                if (result) {
                    this.isDialogOpInProgress = false;
                    this.load();
                    this.showMessage({
                        severity: 'success',
                        summary: 'Collaborateur ajouté avec succès !',
                    });
                }
            });
    }

    save() {
        if (this.idAgent) {
            this.create();
        } else {
            console.log('Veuillez selectionner un agent a noté !! ');
        }
    }

    transition(): void {
        this.router.navigate(['./'], {
            relativeTo: this.activatedRoute.parent,
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
            },
        });
        this.load();
    }

    // onSubmit() {
    //   let noteData: any[] = [];
    //   console.log(this.myFormGroup.value);
    //   for (let i in this.dynamicForm.value.criteres) {
    //     noteData.push(this.dynamicForm.value.criteres[i].noteData)
    //   }
    //   console.log("Bonjour: ", noteData)
    // }

    onAttribuer(selection: any) {
        console.log(selection);
    }

    onCreate() {
        this.agent = {};
        this.form.resetForm();
        this.showDialog = true;
    }

    create() {
        this.clearDialogMessages();
        this.isDialogOpInProgress = true;

        this.noteService.createNoteSuperieur(this.dynamicForm.value).subscribe(
            (response) => {
                if (this.notes.length !== this.recordsPerPage) {
                    this.notes.push(response);
                    this.notes = this.notes.slice();
                }
                // this.totalRecords++;
                this.isDialogOpInProgress = false;
                this.showDialog = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'La note a été attribuée avec succès !',
                    life: 3000,
                });
                // this.showMessage({ severity: 'success', summary: 'Note créée avec succès' });
            },
            (error) => {
                this.handleError(error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Cet agent possède déjà une note : impossible de lui attribuer une autre note !',
                    life: 4000,
                });
            }
        );
    }

    onRejeter(agent?: Agent) {
        this.confirmationService.confirm({
            message:
                'Etes-vous sûr de vouloir retirer cet agent de votre liste de collaborateurs ?',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.rejeter(agent);
            },
        });
    }

    /* gestion de pointage */
    // modal pour pointer un agent
    openModalToPointer(agent: IAgent): void {
        this.selectedAgent = agent;
        this.dialogService
            .open(AjoutModifierPointageComponent, {
                header: 'Pointage du jour',
                width: '50%',
                contentStyle: { overflow: 'auto', backgroundColor: 'white' },
                baseZIndex: 10000,
                maximizable: true,
                data: agent,
            })
            .onClose.subscribe((result) => {
                if (result) {
                    this.isDialogOpInProgress = false;
                    this.load();
                    this.showMessage({
                        severity: 'success',
                        summary:
                            "Le pointage de l'agent effectué avec succès !",
                    });
                }
            });
    }

    // vérifier si l'agent est déjà point dans la journée
    checkIfPointed(agentId: number) {
        /* return this.pointageService
            .hasPointedToday(agentId)
            .subscribe((hasPointed) => {
                if (hasPointed) {
                    // alert('Cet agent a déjà été pointé aujourd’hui.');
                    return false;
                } else {
                    //alert('Cet agent n’a pas encore été pointé aujourd’hui.');
                    return true;
                }
            }); */
        return false;
    }

    voirPointages() {
        this.router.navigate(['/superieur/mes-agents/pointage']);
    }

    /* fin gestion de pointage */
    OnPointer(agent?: Agent) {
        this.confirmationService.confirm({
            message:
                'Etes-vous sûr de vouloir pointer cet agent de votre liste de collaborateurs ?',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.rejeter(agent);
            },
        });
    }

    /* rejeter(agent?: Agent) {
        this.isOpInProgress = true;
        let matricule = agent!.matricule;
        this.agentService.rejeterAgent(agent!, matricule!).subscribe(
            () => {
                this.load();
                this.isOpInProgress = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Agent retiré avec succès',
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
    } */

    rejeter(agent?: Agent) {
        if (
            !agent ||
            !agent.id ||
            !agent.superieurHierarchique ||
            !agent.superieurHierarchique.matricule
        ) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Données de l’agent ou de son supérieur incomplètes pour effectuer le retrait.',
                life: 5000,
            });
            return;
        }

        this.isOpInProgress = true;

        const idAgent = agent.id;
        const matriculeSuperieur = agent.superieurHierarchique.matricule;

        this.agentService.retirerAgent(idAgent, matriculeSuperieur).subscribe(
            () => {
                this.load();
                this.isOpInProgress = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Agent retiré avec succès',
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

    /*         rejeter(agent?: Agent) {
    if (!agent || !agent.id || !agent.superieurHierarchique?.matricule) {
        this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Données de l’agent incomplètes pour effectuer le retrait.',
            life: 5000,
        });
        return;
    }

    this.isOpInProgress = true;

    this.agentService.retirerAgent(agent.id, agent.superieurHierarchique.matricule).subscribe(
        () => {
            this.load();
            this.isOpInProgress = false;
            this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Agent retiré avec succès',
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
} */

    pointer(agent?: Agent) {
        this.isOpInProgress = true;
        let matricule = agent!.matricule;
        this.agentService.rejeterAgent(agent!, matricule!).subscribe(
            () => {
                this.load();
                this.isOpInProgress = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Agent retiré avec succès',
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

    edit() {
        // this.clearDialogMessages();
        // this.isDialogOpInProgress = true;
        // this.agentService.update(this.agent).subscribe(response => {
        //   let index = this.notes.findIndex(note => note.id === response.id);
        //   this.agents[index] = response;
        //   this.isDialogOpInProgress = false;
        //   this.showDialog = false;
        //   this.showMessage({ severity: 'success', summary: 'MinistereInstitution agent modifié avec succes' });
        // }, error => this.handleError(error));
    }

    // Errors
    handleError(error: HttpErrorResponse) {
        console.error(`Processing Error: ${JSON.stringify(error)}`);
        this.isDialogOpInProgress = false;
        this.dialogErrorMessage = error.error.message;
    }

    clearDialogMessages() {
        this.dialogErrorMessage = null;
    }

    showMessage(message: Message) {
        this.message = message;
        this.timeoutHandle = setTimeout(() => {
            this.message = null;
        }, 5000);
    }

    /** Permet d'afficher un modal pour voir les détails */
    openModalDetail(agent: IAgent): void {
        this.dialogService.open(DetailAgentComponent, {
            header: 'Details de categorie',
            width: '60%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            data: agent,
        });
    }

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

    get idAgent() {
        return this.dynamicForm.get('idAgent');
    }
    get f() {
        return this.dynamicForm.controls;
    }
    // get t() { return this.f.criteres as FormArray; }
    get t() {
        return this.f['criteres'] as FormArray;
    }
    get critereGroup() {
        return this.t.controls as FormGroup[];
    }
}
