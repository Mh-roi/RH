import { Component, OnDestroy, OnInit} from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CURRENT_PAGE, MAX_SIZE_PAGE } from 'src/app/shared/constants/pagination.constants';
import { IActivite } from 'src/app/shared/model/activite';
import { Fonctionnaire } from 'src/app/shared/model/fonctionnaire';
import { IStatistiqueDTO, StatistiqueDTO } from 'src/app/shared/model/statistique-dto';
import { ActiviteService } from 'src/app/shared/service/activite.service';
import { DashbordService } from 'src/app/shared/service/dashbord.service';
import { FonctionnaireService } from 'src/app/shared/service/fonctionnaire.service';
import { NoteService } from 'src/app/shared/service/note.service';
import { StatistiqueDTOService } from 'src/app/shared/service/statistique.service';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';
import { environment } from 'src/environments/environment';
import { AppSidebarComponent } from "../../layout/app.sidebar.component";

@Component({
  selector: 'app-drh-home',
  templateUrl: './drh-home.component.html',
  styleUrls: ['./drh-home.component.scss']
 
})
export class DrhHomeComponent {

  knobValue: number = 90;

  selectedWeek: any;

  weeks: any[] = [];

  barData: any;

  cards: any;

  barOptions: any;

  pieData: any;

  pieOptions: any;

  products: any[]=[];

  listTypeAssure: any[]=[];

  listSectAssure: any[]=[]

  labelsBar: any[]=[];

  numbersBar: any[]=[];

  anneeAss:any[]=[]
  valeurAnAss: any[]=[]

  subscription: Subscription;

  dataNoteByFonctionnaire:any;
  noteFonctionnaireOptions: any;
  dataLabelFonc: any[]=[];
  statParFonnaires : IStatistiqueDTO[]=[];
  dataStatFonnaire:any[]=[];
  dataRecours: any;
  dataOptions: any;
  dataOffice: any;
  OfficeOptions: any;
  RecoursOptions: any;
  //config!: AppConfig;
  date10: Date = new Date();
  annee!: any;
  // annee!: Date;
  dataF: any;
  chartFOptions: any;
  message: any ;
  an:any;
  today!: Date;
  year:any;
  statComptes : IStatistiqueDTO[]=[];
  recours : IStatistiqueDTO = new StatistiqueDTO();
  noteOffice :IStatistiqueDTO = new StatistiqueDTO();
  compteActif: IStatistiqueDTO = new StatistiqueDTO();
  compteNonActif: IStatistiqueDTO = new StatistiqueDTO();
  fonctionnaires: Fonctionnaire[] = [];
  recordsPerPage = environment.recordsPerPage;
  totalRecords!: number;
  page = CURRENT_PAGE;
  previousPage?: number;
  maxSize = MAX_SIZE_PAGE;
  predicate!: string;
  ascending!: boolean;
  reverse: any;
  filtreLibelle: string | undefined;
  anneeActu! : Date;
  nbTache!: number;
  nbNote!: number;
  nbAgent!: number;
  activites: IActivite[] =[];
  isLoggedIn = false;
  matricule!: string;
  isLoading: boolean = false;
  

  cols: any[] = [];

  constructor( 
    private layoutService: LayoutService, 
    private dashbordService : DashbordService,
    private statService: StatistiqueDTOService,
    private fonctionnaireService: FonctionnaireService,
    private activiteService: ActiviteService,
    private tokenStorageService: TokenStorageService,
    private noteService: NoteService) {
      this.subscription = this.layoutService.configUpdate$.subscribe(config => {
        // this.initCharts();
      });
  }
  
  ngOnInit(): void {
    this.annee = new Date();
    this.year = this.annee.getFullYear();
    this.getAnnee(this.year);
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.matricule = user.matricule;
    }

    this.loadComptesActifs();
    this.load();
    this.loadNote();
    this.loadAllAgent();
  }

  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.activiteService.getAll(this.matricule,this.year,event).subscribe(response => {
      this.isLoading = false;
      this.nbTache= response.activites.length;
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  loadNote(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.noteService.getAllNote(event).subscribe((response: { notes: string | any[]; }) => {
      this.isLoading = false;
      this.nbNote = response.notes.length;
    }, (error: { error: any; }) => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  loadAllAgent(): void {
    const req = this.buildReq();
    this.fonctionnaireService.getAllAgent(req).subscribe(result => {
      if (result && result.body) {
        this.totalRecords = Number(result.headers.get('X-Total-Count'));
        this.fonctionnaires = result.body || [];
        this.nbAgent = result.body.length;
      }
    });
  }

  buildReq(): any {
    let req = {
      page: this.page -1,
      size: this.recordsPerPage,
      sort: this.sortMethod(),
    };
    let obj : any;
    if (this.filtreLibelle) {
      obj = {};
      obj['libelle.contains'] = this.filtreLibelle;
      req = Object.assign({}, req, obj);
    }
    return req;
  }

  sortMethod(): string[] {
    this.predicate = 'id';
    this.reverse = true;
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    return result;
  }  

  ngOnDestroy(): void {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }

  
getAnnee(an:number){
  this.year = an;
  this.loadOffice(this.year);
  this.loadRecours(this.year);
  this.loadNbParnote(this.year);
}

loadNbParnote(year: any) {
      
  this.statService.getAllParFonctionnaire(year).subscribe(response => {
      if(response){
          this.statParFonnaires = response.body!;  
      for(let i=0; i<this.statParFonnaires.length; i++){
          this.dataStatFonnaire.push(this.statParFonnaires[i].label);
          this.dataLabelFonc.push(this.statParFonnaires[i].value)
      } 
  
    this.dataStatFonnaire = this.dataStatFonnaire;
      this.dataNoteByFonctionnaire = {
          labels: this.dataStatFonnaire,
          datasets: [
              {
                  label: 'Nombre de fonctionnaire par note par an',
                  backgroundColor: ['#EC407A','#AB47BC', '#42A5F5','#7E57C2','#66BB6A',
                  '#FFCA28',
                  '#26A69A','#26A69E','#26A69X','#26A69Z'],
                  data: this.dataLabelFonc
              }
          ]
      }
      };
  }, error => {
    this.message = { severity: 'error', summary: error.error };
    console.error(JSON.stringify(error));
  });
}
getStatComptes(){
  this.dataF = {
      labels: ['Fonctionnaires actifs','Fonctionnaires non actifs'],
      datasets: [
          {
              data: [this.compteActif.value, this.compteNonActif.value],
              backgroundColor: [
                  "#42A5F5",
                  "#66BB6A",
                  "#FFA726"
              ],
              hoverBackgroundColor: [
                  "#64B5F6",
                  "#81C784",
                  "#FFB74D"
              ]
          }
      ]
  };
}
loadRecours(year: any) {
  this.statService.getAllRecours(year).subscribe(response => {
      this.recours = response.body!;
      this.dataRecours = {
          labels: ['Janvier-Decembre'],
          datasets: [
              {
                  label: 'Effectif par an',
                  backgroundColor: '#FFA726',
                  data: [this.recours.value]
              }
          ]
      };
  }
  , error => {
    this.message = { severity: 'error', summary: error.error };
    console.error(JSON.stringify(error));
  });
}

loadOffice(year: any) {
  
  this.statService.getAllOffices(year).subscribe(response => {
      this.noteOffice = response.body!;   
      this.dataOffice = {
          labels: ['Janvier-Decembre'],
          datasets: [
              {
                  label: 'Nombre de note office par an',
                  backgroundColor: '#42A5F5',
                  data: [this.noteOffice.value]
              }
          ]
      };
  }, error => {
    this.message = { severity: 'error', summary: error.error };
    console.error(JSON.stringify(error));
  });
}

loadComptesActifs() {
  this.statService.getAllCompteActif().subscribe(response => {
      this.statComptes = response.body!;
      for (var i = 0; i < this.statComptes.length; i++) {
          if(this.statComptes[i].label){
              this.compteActif = this.statComptes[i];
          } 
          if(!this.statComptes[i].label) {
              this.compteNonActif = this.statComptes[i];
          }
      }
      this.dataF = {
          labels: ['Fonctionnaires actifs','Fonctionnaires non actifs'],
          datasets: [
              {
                  data: [this.compteActif.value, this.compteNonActif.value],
                  backgroundColor: [
                      "#42A5F5",
                      "#66BB6A",
                      "#FFA726"
                  ],
                  hoverBackgroundColor: [
                      "#64B5F6",
                      "#81C784",
                      "#FFB74D"
                  ]
              }
          ]
      };
  }, error => {
    this.message = { severity: 'error', summary: error.error };
    console.error(JSON.stringify(error));
  });
}

}
