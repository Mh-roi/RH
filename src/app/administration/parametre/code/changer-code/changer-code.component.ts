import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { Fonctionnaire, IFonctionnaire } from 'src/app/shared/model/fonctionnaire';
import { FonctionnaireService } from 'src/app/shared/service/fonctionnaire.service';

@Component({
  selector: 'app-changer-code',
  templateUrl: './changer-code.component.html',
  styleUrls: ['./changer-code.component.scss']
})
export class ChangerCodeComponent {
  

  @ViewChild('dtf')
  form!: NgForm;
  submitted!: boolean;
  saveSuccess: boolean = false;
  message: any;
  superieur!: IFonctionnaire;
  timeoutHandle: any;
  newCodeAffiliation!: string;
  oldCodeAffiliation!: string;
  motif!: string;
  reference!: string;
  verifieAvecSucces: boolean = false;
  fonctionnaire!: Fonctionnaire;
  fonctionnaire1!: Fonctionnaire;
  codePresent: boolean = false;
  showDialog!: boolean;
  message1: any;
  checked: boolean = false
  
  constructor(private fonctionnaireService: FonctionnaireService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutHandle);
  }

//   verifier(){
//     if(!this.reference || !this.motif || !this.oldCodeAffiliation || !this.newCodeAffiliation){
//       this.messageService.add(
//         {severity:'error', summary: 'Erreur', detail: 'Tous les champs sont obligatoires !!! ', life: 5000}
//         );
//     } else{
//     this.fonctionnaireService.VerifierAffiliation(this.newCodeAffiliation).subscribe(
//       data => {this.superieur=data},
//       err => {
//         this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Code incorrect, vérifiez le nouveau code que vous avez saisi !!!', life: 5000 });
//       }
//     );
//   }
// }

verifier() {
  if (!this.reference || !this.motif || !this.oldCodeAffiliation || !this.newCodeAffiliation) {
    this.showMessage(
      {severity: 'error', summary: 'Erreur', detail: 'Tous les champs sont obligatoires !!! ', life: 5000}
    );
  } else {
    this.fonctionnaireService.VerifierAffiliation(this.newCodeAffiliation).subscribe(
      data => {
        this.superieur = data;
        this.verifieAvecSucces = true; // La vérification réussit, on active l'affichage du bouton "Enregistrer"
      },
      err => {
        this.showMessage({severity: 'error', summary: 'Erreur', detail: 'Code incorrect, vérifiez le nouveau code que vous avez saisi !!!', life: 5000});
        this.verifieAvecSucces = false; // La vérification a échoué, on désactive l'affichage du bouton "Enregistrer"
      }
    );
  }
}


showMessage(message: Message) {
  this.message = message;
  this.timeoutHandle = setTimeout(() => {
    this.message = null;
  }, 5000);
}
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Succès', detail: 'Vous avez changé de supérieur hiérarchique avec succès !!! ', life: 5000});
}

showError() {
  this.messageService.add(
    {severity:'error', summary: 'Erreur', detail: 'Echec du changement de supérieur, vérifiez votre code supérieur !!! ', life: 5000}
    );
}

reloadPage(){
  setTimeout(()=>{
    location.reload();
  }, 400);
}


genererCodeAffiliation(){
  if(!this.fonctionnaire1.codeGenere){
    this.fonctionnaireService.genererCodeAffiliation().subscribe(
      data => {
        this.fonctionnaire = data;
        this.message = 'Le code a été généré avec succès, veuillez le communiquer a vos agents !';
        this.saveSuccess = true;
             },
      err => {
        this.message = err.message;
        this.saveSuccess = false;
      }
    );
  } else {
    this.codePresent = true;
    this.message = 'Vous avez déjà généré un code d\'affiliation. Allez à l\'onglet \"Mon Code\" pour voir votre code ! ';
  }
  
}

changerCodeAffiliation(){
    this.fonctionnaireService.genererCodeAffiliation().subscribe(
      data => {
        this.fonctionnaire = data;
        this.message = 'Vous avez changé de code avec succès. Veuillez communiquer le nouveau code à vos agents !';
        this.saveSuccess = true;
        this.showDialog = false
             },
      err => {
        this.message1 = err.message;
        this.saveSuccess = false;
      }
    );
}

openNew() {
  // this.fichesPoste = {};
  this.submitted = false;
  this.showDialog = true;
}


  save(){
    this.submitted = true;
    if(!this.reference || !this.motif || !this.oldCodeAffiliation || !this.newCodeAffiliation){
      this.messageService.add(
        {severity:'error', summary: 'Erreur', detail: 'Tous les champs sont obligatoires !!! ', life: 5000}
        );
    } else{
    this.fonctionnaireService.changerAffiliation(this.oldCodeAffiliation, this.newCodeAffiliation, 
      this.reference, this.motif).subscribe(
      data => {
        this.saveSuccess = true;
        this.showSuccess();
        this.reloadPage();
      },
      err => {
        this.message = err.message;
        this.saveSuccess = false;
        this.showError();
        this.reloadPage();
      }
    )
  }   
}

}
