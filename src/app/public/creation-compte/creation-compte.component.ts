import { Component } from '@angular/core';
import { LazyLoadEvent, Message } from 'primeng/api';
import {
    Fonctionnaire,
    IFonctionnaire,
} from 'src/app/shared/model/fonctionnaire';
import { IMinistere, Ministere } from 'src/app/shared/model/ministere';
import { IProfilAgent, ProfilAgent } from 'src/app/shared/model/profil-agent';
import { AuthService } from 'src/app/shared/service/auth.service';
import { AgentService } from 'src/app/shared/service/agent.service';
import { MinistereService } from 'src/app/shared/service/ministere.service';
import { ProfilAgentService } from 'src/app/shared/service/profil-agent.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Agent } from 'src/app/shared/model/agent';
import { UserService } from 'src/app/shared/service/user.service';
import { User } from 'src/app/shared/model/user';
import { IStructure } from 'src/app/shared/model/structure';
import { StructureService } from 'src/app/shared/service/structure.service';
import { IEmploi } from 'src/app/shared/model/emploi';
import { IFonction } from 'src/app/shared/model/fonction';
import { EmploiService } from 'src/app/shared/service/emploi.service';
import { FonctionService } from 'src/app/shared/service/fonction.service';

@Component({
    selector: 'app-creation-compte',
    templateUrl: './creation-compte.component.html',
    styleUrls: ['./creation-compte.component.scss'],
})
export class CreationCompteComponent {
    fonctionnaire: Fonctionnaire = {};
    agent: Agent = {};
    user: User = {};
    pwdConfirmation: String = '';
    ministereInstitutions: IMinistere[] = [];
    ministereInstitution: IMinistere = new Ministere();
    profils: IProfilAgent[] = [];
    element: IProfilAgent[] = [];
    profil: IProfilAgent = new ProfilAgent();
    isSuccessful: boolean = false;
    message: any;
    filteredMinisteresI: IMinistere[] = [];
    filteredProfils: IProfilAgent[] = [];
    isLoggedIn = false;
    isFailed = false;
    notFound = false;
    errorMessage = '';
    dialogErrorMessage: any;
    notFoundMessage = '';
    matriculeRecherche: string = '';
    isDialogOpInProgress!: boolean;
    isOpInProgress!: boolean;
    timeoutHandle: any;
    success!: boolean;
    afficherForm: boolean = false;
    countIscreated: boolean = false;
    echec!: boolean;
    infoMessage = '';
    structures : IStructure[] = [];
    emplois: IEmploi[] = [];
    fonctions: IFonction[] = [];

    constructor(
        private authServive: AuthService,
        private ministereInstitutionService: MinistereService,
        private profilService: ProfilAgentService,
        private agentService: AgentService,
        private dialogRef: DynamicDialogRef,
        private userService: UserService,
        private structureService: StructureService,
        private emploiService: EmploiService,
        private fonctionService: FonctionService
    ) {}

    ngOnInit(): void {

          this.loadFonctions();
          this.loadStructures();
        //this.loadMinisteresInstitutions();
      //  this.loadProfils();
            this.loadEmplois();
  
        /* this.profilService.findAll().subscribe((response) => {
            console.log(response.body);
            this.profil = response.body?.find((p) => p.id === 3)!;
        }); */
        
    //    console.log('le profil par defaut:' + this.profil);
    }


      loadStructures(): void {
    this.structureService.findAll().subscribe({
      next: (res) => {
        console.log("::::::::::::::::::::::::::la liste des structures::::::::::::::::::::::::",res)
        this.structures = res.body ?? [];
      },
      error: () => {
        this.structures = [];
      },
    });
  }

      loadFonctions(): void {
    this.fonctionService.findAll().subscribe({
      next: (res) => {
        console.log("::::::::::::::::::::::::::la liste des fonctions::::::::::::::::::::::::",res)
        this.fonctions = res.body ?? [];
      },
      error: () => {
        this.fonctions = [];
      },
    });
  }

  loadEmplois(): void {
    this.emploiService.findAll().subscribe({
      next: (res) => (this.emplois = res.body ?? []),
      error: () => (this.emplois = [])
    });
  }

  

    // vérifier si le matricule a déjà un compte
    checkIfMatriculeHasAccount() {
        this.userService
            .getUserByMatricule1(this.matriculeRecherche)
            .subscribe({
                next: (response) => {
                    this.countIscreated = true;
                    this.isSuccessful = false;
                    console.log('compte :' + response);
                    if (response == null) {
                        //this.countIscreated = false;
                    } else {
                        console.error(
                            "L'agent est déjà lié au compte :" + response
                        );
                        this.success = false;
                        this.echec = true;
                        this.infoMessage =
                            'Un compte est déjà lié à cet agent !!!';
                    }
                },
                error: (error) => {
                    console.error('error' + JSON.stringify(error));
                    this.isOpInProgress = false;
                    this.showMessage({
                        severity: 'error',
                        summary: error.error.message,
                    });
                    this.success = false;
                    this.echec = true;
                    this.infoMessage =
                        'Une erreur est survenue. Veuillez réessayer plus tard!';
                },
            });

        setTimeout(() => {
            this.notFound = false;
            this.notFoundMessage = '';
        }, 5000);
    }

    saveEntity(): void {
        this.clearDialogMessages();
        this.isDialogOpInProgress = true;
        console.log(
            '================================objet agent à modifier====================',
            this.agent
        );

        if (this.agent) {
            if (this.agent.id) {
                this.agentService.update(this.agent).subscribe({
                    next: (response) => {
                        this.user.matricule = this.agent.matricule;
                        this.user.nom = this.agent.nom;
                        this.user.prenom = this.agent.nom;
                        this.user.nomUtilisateur = this.agent.matricule;
                        this.user.email = this.agent.email;
                        this.user.telephone = this.agent.telephone;
                        this.user.password = this.agent.password;
                        this.user.profile = this.profils[0];
                        // this.profilService.getProfilByName('Agent').subscribe(
                        //   {
                        //     next: (response) => {
                        //       this.user.profile = response;
                        console.log("::::::::::::::::::::::::::::::::::::::L'AGENT QUE NOUS SOUHAITONS CREER::::::::::::::::::::::::::",this.user);
                        this.userService.create(this.user).subscribe({
                            next: (response) => {
                                this.dialogRef.close(response);
                                this.dialogRef.destroy();
                                this.showMessage({
                                    severity: 'success',
                                    summary:
                                        "Compte créé avec succès! Vous recevrez un mail d'activation de votre compte.",
                                });
                                this.success = true;
                                this.echec = false;
                                this.infoMessage =
                                    "Compte créé avec succès! Vous recevrez un mail d'activation de votre compte.";
                            },
                            error: (error) => {
                                console.error('error' + JSON.stringify(error));
                                this.success = false;
                                this.echec = true;
                                this.infoMessage =
                                    'Une erreur est survenue. Veuillez réessayer plus tard!';
                            },
                        });
                    },
                    error: (error) => {
                        console.error('error' + JSON.stringify(error));
                        this.success = false;
                        this.echec = true;
                        this.infoMessage =
                            'Une erreur est survenue. Veuillez réessayer plus tard!';
                    },
                });
            }
        }
    }

    clearDialogMessages() {
        this.dialogErrorMessage = null;
    }

   /*  loadMinisteresInstitutions(event?: LazyLoadEvent) {
        this.ministereInstitutionService.findAll().subscribe(
            (response) => {
                this.ministereInstitutions = response.body!;
            },
            (error) => {
                this.message = { severity: 'error', summary: error.error };
                console.error(JSON.stringify(error));
            }
        );
    } */

    loadProfils() {
        let query = 'admin';
        let query1 = 'admin';
        this.profilService.findAll().subscribe((response) => {
            for (let index = 0; index < response.body!.length; index++) {
                let element = response.body![index];
                if (
                    element.name!.toLowerCase().indexOf(query.toLowerCase()) <
                        0 ||
                    element.name!.toLowerCase().indexOf(query1.toLowerCase()) <
                        0
                ) {
                    this.profils.push(element);
                    this.profil = element;
                }
            }
            this.profil = this.profils[0];
            console.log(this.profils[0]);
        });
    }

    filteredMinistere(event: any) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: IMinistere[] = [];
        let query: string = event.query ?? '';

        for (let i = 0; i < this.ministereInstitutions.length; i++) {
            const ministereInstitution: IMinistere =
                this.ministereInstitutions[i];
            if (
                ministereInstitution.libelle
                    ?.toLowerCase()
                    .indexOf(query.toLowerCase()) === 0
            ) {
                filtered.push(ministereInstitution);
            }
        }
        this.filteredMinisteresI = filtered;
    }

    filteredProfil(event: any) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: IProfilAgent[] = [];
        let query: string = event.query ?? '';

        for (let i = 0; i < this.profils.length; i++) {
            const profil: IProfilAgent = this.profils[i];
            // console.log(ministereInstitution.libelle)
            if (profil.name?.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(profil);
            }
        }
        this.filteredProfils = filtered;
    }

    showMessage(message: Message) {
        this.message = message;
        this.timeoutHandle = setTimeout(() => {
            this.message = null;
        }, 5000);
    }

    // search agent by matricule
    searchAgentByMatricule() {
        console.log('recherche matricule :' + this.matriculeRecherche);
        this.checkIfMatriculeHasAccount();
        console.log('countIscreated' + this.countIscreated);
        if (!this.countIscreated) {
            this.success = false;
            this.echec = false;
            this.agentService
                .getAgentByMatricule(this.matriculeRecherche)
                .subscribe({
                    next: (response) => {
                        console.log('AGENT::::::::::', response);
                        if (response) {
                            this.agent = response;
                            this.agent.structure =
                                response.structure;
                            this.afficherForm = true;
                            /* this.agent.emploi?.libelle =
                      response.emploi?.libelle; */
                        }
                    },
                    error: (error) => {
                        this.afficherForm = false;
                        console.error('error' + JSON.stringify(error));
                        this.isOpInProgress = false;
                        this.showMessage({
                            severity: 'error',
                            summary: error.message,
                        });
                        this.success = false;
                        this.echec = true;
                        this.infoMessage =
                            'Une erreur est survenue. Veuillez réessayer plus tard!';
                    },
                });

            setTimeout(() => {
                this.notFound = false;
                this.notFoundMessage = '';
            }, 5000);
        }
    }

    // Enregistrer le compte
    registerCompte() {
        this.user.matricule = this.agent.matricule;
        this.user.nom = this.agent.nom;
        this.user.prenom = this.agent.nom;
        this.user.nomUtilisateur = this.agent.matricule;
        this.user.email = this.agent.email;
        this.user.telephone = this.agent.telephone;
        this.user.password = this.agent.password;
  // Envoi uniquement des IDs si présents
  this.user.structureId = this.agent.structure?.id;
  this.user.emploiId = this.agent.emploi?.id;
  this.user.fonctionId  = this.agent.fonction?.id;

        this.user.profile = this.profils[0];
     console.log("::::::::::::::::::::::::::::::::::::::L'AGENT QUE NOUS SOUHAITONS CREER::::::::::::::::::::::::::",this.user);
        this.userService.createCompte(this.user).subscribe({
            next: (response) => {
                this.dialogRef.close(response);
                this.dialogRef.destroy();
                this.showMessage({
                    severity: 'success',
                    summary:
                        "Compte créé avec succès! Vous recevrez un mail d'activation de votre compte.",
                });
                this.success = true;
                this.echec = false;
                this.infoMessage =
                    "Compte créé avec succès! Vous recevrez un mail d'activation de votre compte.";
                // aller à la page de connexion après 5 secondes
                setTimeout(() => {
                    window.location.href = '/auth/login';
                }, 5000);
            },
            error: (error) => {
                console.error('error' + JSON.stringify(error));
                this.success = false;
                this.echec = true;
                this.infoMessage =
                    'Une erreur est survenue. Veuillez réessayer plus tard!';
            },
        });
    }

    getAgentByMatricule() {
        console.log('recherche matricule :' + this.matriculeRecherche);
        this.success = false;
        this.echec = false;
        this.fonctionnaire.matricule = this.matriculeRecherche;
        console.log(this.matriculeRecherche);
        this.userService
            .getUserByMatricule1(this.matriculeRecherche)
            .subscribe({
                next: (response) => {
                    console.log('compte :' + response);
                    if (response == null) {
                        this.agentService
                            .getAgentByMatricule(this.matriculeRecherche)
                            .subscribe({
                                next: (response) => {
                                    if (response) {
                                        this.agent = response;
                                        this.agent.uniteAdministrative =
                                            response.structure?.libelle;
                                        /*  this.agent.lbelleEmploi =
                                        response.emploi?.libelle; */
                                    }
                                },
                            });
                    } else {
                        console.error(
                            "L'agent est déjà lié au compte :" + response
                        );
                        this.success = false;
                        this.echec = true;
                        this.infoMessage =
                            'Un compte est déjà lié à cet agent!';
                    }
                },
                error: (error) => {
                    console.error('error' + JSON.stringify(error));
                    this.isOpInProgress = false;
                    this.showMessage({
                        severity: 'error',
                        summary: error.error.message,
                    });
                    this.success = false;
                    this.echec = true;
                    this.infoMessage =
                        'Une erreur est survenue. Veuillez réessayer plus tard!';
                },
            });

        setTimeout(() => {
            this.notFound = false;
            this.notFoundMessage = '';
        }, 5000);
    }
}
