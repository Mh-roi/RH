import { Component } from '@angular/core';
import { Fonctionnaire } from 'src/app/shared/model/fonctionnaire';
import { FonctionnaireService } from 'src/app/shared/service/fonctionnaire.service';
import { CodeComponent } from '../code.component';

@Component({
  selector: 'app-generer-code',
  templateUrl: './generer-code.component.html',
  styleUrls: ['./generer-code.component.scss']
})
export class GenererCodeComponent {


  fonctionnaire!: Fonctionnaire;
  fonctionnaire1!: Fonctionnaire;
  saveSuccess: boolean = false;
  codePresent: boolean = false;
  message: any;
  monCode!: CodeComponent;
  checked: boolean = false;
  submitted!: boolean;
  showDialog!: boolean;
  message1: any;
  constructor(private fonctionnaireService: FonctionnaireService) { }

  ngOnInit(): void {
    this.fonctionnaireService.genererCodeAffiliation().subscribe(
      data => {
        this.fonctionnaire1 = data;
        // this.message = 'Le code a ete recupere avec succes ';
        this.saveSuccess = true;
             },
      err => {
        this.message = err.message;
        this.saveSuccess = false;
      }
    );
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
}
