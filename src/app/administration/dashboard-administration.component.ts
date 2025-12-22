import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DashbordService } from '../shared/service/dashbord.service';
import { Table } from 'primeng/table';
import { IStatistiqueDTO, StatistiqueDTO } from '../shared/model/statistique-dto';
import { StatistiqueDTOService } from '../shared/service/statistique.service';

@Component({
  selector: 'app-dashboard-administration',
  templateUrl: './dashboard-administration.component.html',
  styleUrls: ['./dashboard-administration.component.scss']
})
export class DashboardAdministrationComponent implements OnInit, OnDestroy {

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

  //subscription: Subscription;

  dataNoteByFonctionnaire:any;
  noteFonctionnaireOptions: any;
  dataLabelFonc: any[]=[];
  statParFonnaires : IStatistiqueDTO[]=[];
  dataStatFonnaire:any[]=[];
  dataRecours: any;
  dataMoyStruct: any;
  dataStruct: any;
  dataMoyEval: any;
  dataEval:any;
    dataOptions: any;
    dataOffice: any;
    OfficeOptions: any;
    RecoursOptions: any;
    //config!: AppConfig;
    date10: Date = new Date();
    annee!: any;
    structure: string="";
    evaluateur: any;
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
  

  cols: any[] = [];

  constructor( 
    private layoutService: LayoutService, 
    private dashbordService : DashbordService,
    private statService: StatistiqueDTOService) {
      
  }
  
  ngOnInit(): void {
    this.annee = new Date();
    this.year = this.annee.getFullYear();
    this.structure="CS";
    this.evaluateur="admin";
    this.getAnnee(this.year);
    this.loadMoyenneStructureInit()
    this.loadMoyenneEvaluateurInit()
    
     
  }

  
 
  onWeekChange() {
      let newBarData = {...this.barData};
      newBarData.datasets[0].data = this.selectedWeek.data[0];
      newBarData.datasets[1].data = this.selectedWeek.data[1];
      this.barData = newBarData;
  }
  
  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  ngOnDestroy(): void {
      // if (this.subscription) {
      //     this.subscription.unsubscribe();
      // }
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

//  les moyennes @Brigitte


loadMoyenneStructureInit() {
  this.dataStruct=0;
  this.dataMoyStruct = {
    labels: ['Janvier-Decembre'],
    datasets: [
        {
            label: 'Moyenne notes par structure',
            backgroundColor: '#FFA726',
            data: [this.dataStruct]
        }
    ]
};
}

loadMoyenneEvaluateurInit(){
  this.dataEval=0;
  this.dataMoyEval = {
    labels: ['Janvier-Decembre'],
    datasets: [
        {
            label: 'Moyenne notes par evaluateur',
            backgroundColor: '#FFA726',
            data: [this.dataEval]
        }
    ]
};
}

loadMoyenneStructure(an: any, struct:any) {
  this.year=an;
  this.structure= struct;
  this.statService.getMoyenneNoteEvaluateur(an, struct).subscribe(response => {
    this.dataStruct = response.body;
    
    console.error("mmmmmmmmmmmmm", this.dataStruct)
      this.dataMoyStruct = {
        labels: ['Janvier-Decembre'],
        datasets: [
            {
                label: 'Moyenne notes par structure',
                backgroundColor: '#42A5F5',
                data: [this.dataStruct]
            }
        ]
    };
  }
  , error => {
  this.message = { severity: 'error', summary: error.error };
  console.error(JSON.stringify(error));
  });
  }

loadMoyenneEvaluateur(an: any, evaluateur:any) {
  this.year=an;
  this.evaluateur=evaluateur;
  this.statService.getMoyenneNoteEvaluateur(an, evaluateur).subscribe(response => {
      this.dataEval = response.body!;
      this.dataMoyEval = {
          labels: ['Janvier-Decembre'],
          datasets: [
              {
                  label: 'Moyenne notes par evaluateur',
                  backgroundColor: '#42A5F5',
                  data: [this.dataEval]
              }
          ]
      };
  }
  , error => {
    this.message = { severity: 'error', summary: error.error };
    console.error(JSON.stringify(error));
  });
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
                  label: 'Effectif par an',
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
