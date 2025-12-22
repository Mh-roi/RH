import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Fonctionnaire } from 'src/app/shared/model/fonctionnaire';
import { IMinistere, Ministere } from 'src/app/shared/model/ministere';
import { IProfilAgent, ProfilAgent } from 'src/app/shared/model/profil-agent';
import { AuthService } from 'src/app/shared/service/auth.service';
import { MinistereService } from 'src/app/shared/service/ministere.service';
import { ProfilAgentService } from 'src/app/shared/service/profil-agent.service';

@Component({
  selector: 'app-code-ministre',
  templateUrl: './code-ministre.component.html',
  styleUrls: ['./code-ministre.component.scss']
})
export class CodeMinistreComponent {

  fonctionnaire: Fonctionnaire={};
  pwdConfirmation:String='';
  ministereInstitutions: IMinistere[] =[];
  ministereInstitution: IMinistere= new Ministere();
  profils: IProfilAgent[] =[];
  element: IProfilAgent[] =[];
  profil: IProfilAgent= new ProfilAgent();
  isSuccessful:boolean=false;
  message: any ;
  filteredMinisteresI: IMinistere[]=[];
  filteredProfils: IProfilAgent[]=[];
  isLoggedIn = false;
  isSuccessFailed = false;
  errorMessage = '';


  constructor(
    private authServive:AuthService,
    private ministereInstitutionService : MinistereService,
    private profilService: ProfilAgentService) {
  }


  ngOnInit(): void {
    this.loadMinisteresInstitutions();
    this.loadProfils();
  }
  
  activateCompte(){
    this.authServive.activerCompteMinistre(this.fonctionnaire).subscribe(data =>{
      this.isSuccessful=true;
      this.isSuccessFailed = false;
      // console.log(JSON.stringify(this.isSuccess));
    }, error => {
      this.errorMessage = error.error.message;
      this.isSuccessFailed = true;
    })
  }

  loadMinisteresInstitutions(event?: LazyLoadEvent) {
    this.ministereInstitutionService.getAll().subscribe(response => {
      this.ministereInstitutions = response.ministeres!;
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }


  loadProfils(){
    let query = "Admin";
    let query1 = "admin";
    this.profilService.findAll().subscribe(response => {
      for (let index = 0; index < response.body!.length; index++) {
        let element = response.body![index];
      if (element.libelle!.toLowerCase().indexOf(query.toLowerCase()) < 0   ||
      element.libelle!.toLowerCase().indexOf(query1.toLowerCase()) < 0 ) {
        this.profils.push(element);
      }
      }
      this.profils  = this.profils;
    });
  }

  filteredMinistere(event:any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : IMinistere[] = [];
    let query: string = event.query ?? '';

    for(let i = 0; i < this.ministereInstitutions.length; i++) {
        const ministereInstitution: IMinistere = this.ministereInstitutions[i];
        // console.log(ministereInstitution.libelle)
        if (ministereInstitution.libelle?.toLowerCase().indexOf(query.toLowerCase())===0) {
            filtered.push(ministereInstitution);
        }
    }
    this.filteredMinisteresI = filtered;
  }

  filteredProfil(event:any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : IProfilAgent[] = [];
    let query: string = event.query ?? '';

    for(let i = 0; i < this.profils.length; i++) {
        const profil: IProfilAgent = this.profils[i];
        // console.log(ministereInstitution.libelle)
        if (profil.libelle?.toLowerCase().indexOf(query.toLowerCase())===0) {
            filtered.push(profil);
        }
    }
    this.filteredProfils = filtered;
  }

}
