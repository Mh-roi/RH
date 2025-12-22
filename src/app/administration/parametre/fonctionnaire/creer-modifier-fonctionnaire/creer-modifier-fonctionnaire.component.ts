import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { LazyLoadEvent, Message } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Agent, IAgent } from 'src/app/shared/model/agent';
import { AgentService } from 'src/app/shared/service/agent.service';
import { LISTE_SEXES } from 'src/app/shared/constants/liste.constants';
import { Fonctionnaire } from 'src/app/shared/model/fonctionnaire';
import { IFonction } from 'src/app/shared/model/fonction';
import { IMinistere } from 'src/app/shared/model/ministere';
import { FonctionService } from 'src/app/shared/service/fonction.service';
import { MinistereService } from 'src/app/shared/service/ministere.service';
import { IProfilAgent } from 'src/app/shared/model/profil-agent';
import { IEmploi } from 'src/app/shared/model/emploi';
import { EmploiService } from 'src/app/shared/service/emploi.service';
import { IStructure } from 'src/app/shared/model/structure';
import { StructureService } from 'src/app/shared/service/structure.service';

@Component({
    selector: 'app-creer-modifier-agent',
    templateUrl: './creer-modifier-fonctionnaire.component.html',
    styleUrls: ['./creer-modifier-fonctionnaire.component.scss'],
})
export class CreerModifierFonctionnaireComponent {
    @ViewChild('dtf') form!: NgForm;

    fonctionnaire: Fonctionnaire = new Fonctionnaire();
    @Input() data: Fonctionnaire = new Fonctionnaire();

    error: string | undefined;
    isDialogOpInProgress = false;
    message: any;
    timeoutHandle: any;
    listeSexes = LISTE_SEXES;
    agents: IAgent[] = [];
    profils: IFonction[] = [];
    ministeres: IMinistere[] = [];
    structures: IStructure[] = [];
    fonctions: IFonction[] = [];
    emplois: IEmploi[] = [];
    profils_agent: IProfilAgent[] = [];

    constructor(
        private agentService: AgentService,
        private fonctionService: FonctionService,
        private emploiService: EmploiService,
        private ministereService: MinistereService,
        private structureService: StructureService,
        private dialogRef: DynamicDialogRef,
        private dynamicDialog: DynamicDialogConfig
    ) {}

    ngOnInit(): void {
        this.loadFonction();
        this.loadEmploi();
        this.loadMinistere();
        this.loadStructure();
        this.loadAgents();
        if (this.dynamicDialog.data) {
            this.fonctionnaire = cloneDeep(this.dynamicDialog.data);
        }
        console.log('Fonctionnaire à modifier :', this.fonctionnaire);
        console.log('les fonctions :', this.fonctions);
        console.log('les emplois :', this.emplois);
        console.log('les ministères :', this.ministeres);
        console.log('les structures :', this.structures);
        console.log('les agents :', this.agents);
    }

    loadEmploi(event?: LazyLoadEvent) {
        this.emploiService.findAll().subscribe(
            (response) => {
                this.emplois = response.body!;
            },
            (error) => {
                this.message = { severity: 'error', summary: error.error };
                console.error(JSON.stringify(error));
            }
        );
    }

    loadFonction(event?: LazyLoadEvent) {
        this.fonctionService.findAll().subscribe(
            (response) => {
                this.fonctions = response.body!;
            },
            (error) => {
                this.message = { severity: 'error', summary: error.error };
                console.error(JSON.stringify(error));
            }
        );
    }
    loadMinistere(event?: LazyLoadEvent) {
        this.ministereService.getAll().subscribe(
            (response) => {
                // Récupération des ministères à partir de la réponse et assignation à this.ministeres
                this.ministeres = response.ministeres;
            },
            (error) => {
                // Gestion des erreurs et affichage du message d'erreur
                this.message = { severity: 'error', summary: error.error };
                console.error(JSON.stringify(error));
            }
        );
    }

    loadStructure(event?: LazyLoadEvent) {
        this.structureService.findAll().subscribe(
            (response) => {
                this.structures = response.body!;
            },
            (error) => {
                this.message = { severity: 'error', summary: error.error };
                console.error(JSON.stringify(error));
            }
        );
    }

    loadAgents() {
        this.agentService.listAgents().subscribe(
            (response) => {
                this.agents = response.body!;
                console.log('Agents chargés:', this.agents);
            },
            (error) => {
                this.message = { severity: 'error', summary: error.error };
                console.error(JSON.stringify(error));
            }
        );
    }

    isEditing() {
        return !!this.fonctionnaire.id;
    }

    clear(): void {
        this.form.resetForm();
        this.dialogRef.close();
        this.dialogRef.destroy();
    }

    showMessage(message: Message) {
        this.message = message;
        this.timeoutHandle = setTimeout(() => {
            this.message = null;
        }, 5000);
    }

    saveEntity(): void {
        this.isDialogOpInProgress = true;
        if (this.isEditing()) {
            this.agentService
                .updateFonctionnaire(this.fonctionnaire)
                .subscribe({
                    next: (response) => {
                        this.dialogRef.close(response);
                        this.dialogRef.destroy();
                        this.showMessage({
                            severity: 'success',
                            summary: 'Agent modifié avec succès',
                        });
                    },
                    error: (error: HttpErrorResponse) => {
                        this.isDialogOpInProgress = false;
                        this.showMessage({
                            severity: 'error',
                            summary:
                                error.error.message ||
                                'Erreur lors de la modification',
                        });
                    },
                });
        } else {
            this.agentService
                .createFonctionnaire(this.fonctionnaire)
                .subscribe({
                    next: (response) => {
                        this.dialogRef.close(response);
                        this.dialogRef.destroy();
                        this.showMessage({
                            severity: 'success',
                            summary: 'Agent créé avec succès',
                        });
                    },
                    error: (error: HttpErrorResponse) => {
                        this.isDialogOpInProgress = false;
                        this.showMessage({
                            severity: 'error',
                            summary:
                                error.error.message ||
                                'Erreur lors de la création',
                        });
                    },
                });
        }
    }
}
