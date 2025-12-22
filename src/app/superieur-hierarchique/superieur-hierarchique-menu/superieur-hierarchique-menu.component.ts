import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LazyLoadEvent, MenuItem, Message, MessageService } from 'primeng/api';
import { ChangePasswordVo, Fonctionnaire } from 'src/app/shared/model/fonctionnaire';
import { Ministere } from 'src/app/shared/model/ministere';
import { ProfilAgent } from 'src/app/shared/model/profil-agent';
import { FonctionnaireService } from 'src/app/shared/service/fonctionnaire.service';
import { MinistereService } from 'src/app/shared/service/ministere.service';
import { ProfilAgentService } from 'src/app/shared/service/profil-agent.service';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-superieur-hierarchique-menu',
  templateUrl: './superieur-hierarchique-menu.component.html',
  styleUrls: ['./superieur-hierarchique-menu.component.scss']
})
export class SuperieurHierarchiqueMenuComponent {

  @ViewChild('dtf') form!: NgForm;
  items: MenuItem[]=[];
  sousItems: MenuItem[]=[];
  private profil?: string;
  profils:ProfilAgent[]=[];
  isLoggedIn = false;
  showAdminBoard = false;
  display: boolean = false;
  showModeratorBoard = false;
  user:any;
  ministereDetail:any;
  userProfil:any;
  username?: string;
  matricule?: string;
  message: any;
  ministeres: Ministere[]=[];
  ministere:Ministere={};
  timeoutHandle: any;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;

  dialogErrorMessage: any;
 
  fonctionnaire: Fonctionnaire = {};
  showDialogPerso: boolean=false;
  

    fonctionnaires : Fonctionnaire[]=[];
    changePasswordVo: ChangePasswordVo = {};

  
   
    pwdConfirmation:String='';

  
  
    selection: any;


  constructor(private tokenStorageService: TokenStorageService, 
    private router: Router,
    private fonctionnaireService: FonctionnaireService,
      private messageService: MessageService,
      private ministerService: MinistereService,
      private profilService: ProfilAgentService
  
  ) {
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/']);
    // window.location.reload();
  }

  ngOnInit(): void {
    this.loadProfils();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      this.profil = this.user.profil;
      this.matricule = this.user.matricule;

      console.log("l'utilisateur connecté::::::",this.user);
      // this.fonctionnaireService.afficherCodeAffiliation().subscribe(
      //   data => {
      //     this.fonctionnaire = data;
      //     this.matricule = this.fonctionnaire.matricule;
      //     this.userProfil= this.fonctionnaire.profil;
      //     this.ministereDetail = this.fonctionnaire.ministereInstitution;
      //     console.log("Me :", this.fonctionnaire)
      //   },
      //   err => {
      //     this.message = err.message;
      //   }
      // );
    }
    
    this.sousItems = [
      {label: 'Mes informations', icon: 'pi pi-user-plus', command: () => this.onEdit()},
      {separator: true},
      {label: 'Changer mot de passe', icon: 'pi-user-edit', command: () => this.onEditCompte()},
      {label: 'Se deconnecter', icon:"pi pi-sign-out", command: () => this.logout()}
    ];

    this.items = [
      {
        label:'Accueil',
        icon: 'pi pi-home',
        routerLink: ['/superieur']
      },
      {
        label:'Mes agents',
        icon: 'pi pi-users',
        routerLink: ['/superieur/mes-agents']
      },
   /*    {
        label: 'Fiches',
        icon: 'pi pi-folder-open',
        routerLink: ['/superieur/fiche'],
      }, */
      {
  label: 'Fiches',
  icon: 'pi pi-folder-open',
  items: [
    {
      label: 'Mes fiches créées',
      icon: 'pi pi-file-edit',
      routerLink: ['/superieur/fiche']
    },
    {
      label: 'Fiches partagées avec moi',
      icon: 'pi pi-users',
      routerLink: ['/superieur/ficheStructure']
    }
  ]
}
,
       {
        label:'Mes pointages',
        icon: 'pi pi-users',
        routerLink: ['/superieur/mes-pointages']
      },
    /*  {
        label: 'Mes notes',
        icon: 'pi pi-folder-open',
        routerLink: ['/superieur/mes-notes'],
      },
      {
        label: 'Notes de mes agents',
        icon: 'pi pi-folder-open',
        routerLink: ['/superieur/notes-agents'],
      },*/
      {
        label: 'FAQ',
        icon: 'pi pi-folder-open',
        routerLink: ['/superieur/apropos'],
      },
      {
        label: 'Manuel utilisateur',
        icon: 'pi pi-book',
        command: () => this.download(),
      }
    ];
  }
 
  onEditCompte() {
    this.clearDialogMessages();
    this.showDialog = true;
  }
  
  onEdit() {
    this.clearDialogMessages();
    this.showDialogPerso = true;
  }

  isEditing() {
    return !!this.fonctionnaire.id;
  }

  handleError(error: HttpErrorResponse) {
    console.error(`Processing Error: ${JSON.stringify(error)}`);
    this.isDialogOpInProgress = false;
    this.dialogErrorMessage = error.error.title;
    console.error("error",this.dialogErrorMessage)
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

  download(){
    // window.open(environment.domaine+'/assets/download/eNOTATION.pdf','_blank');
  }
 



  //////////////////////////////////////////////////////////////////////////////////////////////
 
  editCompteFonctionnaire() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.fonctionnaireService.changerPassword(this.changePasswordVo).subscribe(response => {
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Compte modifie avec succes' });
      this.tokenStorageService.signOut();
      this.router.navigate(['/']);
    }, error => this.handleError(error));
  }
 
  loadMinisteres(event?: LazyLoadEvent) {
    this.ministerService.getAll().subscribe(response => {
     
      this.ministeres = response.ministeres;
    }, error => {
     this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  loadProfils(event?: LazyLoadEvent) {
    this.profilService.findAll(event).subscribe(response => {
      
      console.log("les profils à charger sont:::::::::::::::::::",response.body)
     
      this.profils = response.body!;
    }, error => {
     this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.fonctionnaire.matricule=this.matricule;

    console.log("l'id à modifier ::::::::::::",this.fonctionnaire.id)


    console.log("l'bjet à envoyer pour la mise à jours::::::::::::",this.fonctionnaire)
    this.fonctionnaireService.updateAcc(this.fonctionnaire).subscribe(response => {
      let index = this.fonctionnaires.findIndex(fonctionnaire => fonctionnaire.id === response.id);
      console.log("l'id retrouver ::::::::::::",index)

      this.fonctionnaires[index] = response;
      this.isDialogOpInProgress = false;
      this.showDialogPerso = false;
      this.messageService.add({ severity: 'success', summary:'Succès', detail: 'Fonctionnaire modifié avec succès' });
    }, error => this.handleError(error));
  }


 
}
