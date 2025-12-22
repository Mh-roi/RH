import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { LISTE_SEXES } from 'src/app/shared/constants/liste.constants';
import { Agent, IAgent } from 'src/app/shared/model/agent';
import { IEmploi } from 'src/app/shared/model/emploi';
import { IFonction } from 'src/app/shared/model/fonction';
import { Fonctionnaire, IFonctionnaire } from 'src/app/shared/model/fonctionnaire';
import { IMinistere } from 'src/app/shared/model/ministere';
import { IProfilAgent } from 'src/app/shared/model/profil-agent';
import { IStructure } from 'src/app/shared/model/structure';
import { AgentService } from 'src/app/shared/service/agent.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { EmploiService } from 'src/app/shared/service/emploi.service';
import { FonctionService } from 'src/app/shared/service/fonction.service';
import { FonctionnaireService } from 'src/app/shared/service/fonctionnaire.service';
import { MinistereService } from 'src/app/shared/service/ministere.service';
import { ProfilAgentService } from 'src/app/shared/service/profil-agent.service';
import { StructureService } from 'src/app/shared/service/structure.service';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';

@Component({
  selector: 'app-creer-modifier-agent',
  templateUrl: './creer-modifier-agent.component.html',
  styleUrls: ['./creer-modifier-agent.component.scss']
})
export class CreerModifierAgentComponent {

  @ViewChild('dtf') form!: NgForm;
  fonctionnaire: IFonctionnaire = new Fonctionnaire();
  agent:IAgent=new Agent();
  @Input() data: IFonctionnaire = new Fonctionnaire();
  fonctionnaires: IFonctionnaire[]=[];
  agents: IAgent []=[];
  profils: IFonction[]=[];
  ministeres: IMinistere[]=[];
 // parents: ICategorie[]=[];
  error: string | undefined;
  showDialog = false;
  isDialogOpInProgress!: boolean;
  message: any;
  dialogErrorMessage: any;
  timeoutHandle: any;
  isOpInProgress!: boolean;
  listeSexes = LISTE_SEXES;
  profils_agent: IProfilAgent[]=[];
  matriculeRecherche: string="";
     structures: IStructure[] = [];
fonctions: IFonction[] = [];
emplois: IEmploi[] = [];

  constructor(
   // private fonctionnaireService: FonctionnaireService,
    private agentService: AgentService,
        private structureService: StructureService,
            private fonctionService: FonctionService,
                private emploiService: EmploiService,


    private profileService: FonctionService,
    private ministereService: MinistereService,
    private profilAgentService: ProfilAgentService,
    private dialogRef: DynamicDialogRef,
    private dynamicDialog: DynamicDialogConfig,
    private confirmationService: ConfirmationService,
    private authService: AuthService,  // ✅ Injecté ici
    private tokenStorage: TokenStorageService // <- ajout ici


  ) { }

  ngOnInit(): void {
    //this.loadProfil();
  //  this.loadMinistere();
   // this.loadProfilAgent();
    if (this.dynamicDialog.data) {
    //  this.fonctionnaire = cloneDeep(this.dynamicDialog.data);
      this.agent = cloneDeep(this.dynamicDialog.data);
    }

       this.loadStructures();
    this.loadFonctions();
    this.loadEmplois();

  }

  loadProfilAgent(event?: LazyLoadEvent) {
    this.profilAgentService.findAll().subscribe(response => {
      this.profils_agent = response.body!;
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

 loadMinistere(event?: LazyLoadEvent) {
    this.ministereService.getAll().subscribe(response => {
      this.ministeres = response.ministeres!;
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  loadProfil(event?: LazyLoadEvent) {
    this.profileService.findAll().subscribe(response => {
      this.profils = response.body!;
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  clear(): void {
    this.form.resetForm();
    this.dialogRef.close();
    this.dialogRef.destroy();
  }
  isEditing() {
    return !!this.agent.id;
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



  updateAgentDetails() {

    const matricule = this.matriculeRecherche?.trim();

    if (!matricule || !/^[a-zA-Z0-9]*$/.test(matricule)) {
      console.warn('Matricule non conforme à LOGIN_REGEX');
      return;
    }
    
    this.agentService.getAgentByMatricule(matricule).subscribe({

      next: (response) => {

        console.log('AGENT::::::::::',response);
        this.agent.id = response.id;
        this.agent.nom = response.nom;
        this.agent.prenom = response.prenom;
        this.agent.structure = response.structure;
        //this.agent.min = response.ministereInstitution;
        this.agent.sexe = response.sexe;
        this.agent.fonction = response.fonction;
        this.agent.emploi = response.emploi;
        this.agent.email = response.email;
        this.agent.telephone = response.telephone
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l’agent:', error);
      }
    });
    
  }


  create() {
  this.clearDialogMessages();
  this.isDialogOpInProgress = true;

  const user = this.tokenStorage.getUser(); // superieur hiérarchique

  // Préparer l'objet agent complet
  this.agent.matricule = this.matriculeRecherche;
  this.agent.superieurHierarchique = user;

  console.log("Objet agent à envoyer pour enroler :", this.agent);

  if (!this.agent.id) {
    console.error("⚠️ L'agent doit avoir un ID avant d'être enrolé !");
    this.isDialogOpInProgress = false;
    return;
  }

  // Appel du service
  this.agentService.enrolerAgent(this.agent).subscribe({
    next: (response) => {
      console.log("Réponse du backend après enrolment :", response);
      this.isDialogOpInProgress = false;
      this.dialogRef.close(response);
      this.dialogRef.destroy();
      this.showMessage({ severity: 'success', summary: 'Collaborateur ajouté avec succès !' });
    },
    error: (error) => {
      this.isDialogOpInProgress = false;
      console.error("Erreur lors de l'enrollement :", error);
      this.handleError(error);
    }
  });
}




  saveEntity(): void {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    console.log("================================objet agent à modifier====================",this.agent)

    if (this.agent) {
      if (this.agent.id) {
        this.agentService.update(this.agent).subscribe(
          {
            next: (response) => {
              this.dialogRef.close(response);
              this.dialogRef.destroy();
              this.showMessage({ severity: 'success', summary: 'fonctionnaire modifié avec succès' });

            },
            error: (error) => {
              console.error("error" + JSON.stringify(error));
              this.isOpInProgress = false;
              this.showMessage({ severity: 'error', summary: error.error.message });

            }
          });
      } else {
        console.log("================================objet agent à enroller====================",this.agent)
        this.agentService.create(this.agent).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
            this.dialogRef.destroy();
            this.showMessage({
              severity: 'success',
              summary: 'fonctionnaire creer avec succès',
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



  loadStructures(): void {
    this.structureService.findAll().subscribe(response => {
      console.log("listes structures::::::::::::",response.body || [])
      this.structures = response.body || [];
    });
  }





  loadFonctions(): void {
    this.fonctionService.findAll().subscribe(response => {

            console.log("listes fonctions::::::::::::",response.body || [])

      this.fonctions = response.body || [];
    });
  }

  loadEmplois(): void {
    this.emploiService.findAll().subscribe(response => {
            console.log("listes emplois::::::::::::",response.body || [])

      this.emplois = response.body || [];
    });
  }


}
