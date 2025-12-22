import { Component, OnDestroy, OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { IStatistiqueDTO, StatistiqueDTO } from 'src/app/shared/model/statistique-dto';
import { StatistiqueDTOService } from 'src/app/shared/service/statistique.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit, OnDestroy {
  knobValue: number = 90;

  selectedWeek: any;

  weeks: any[] = [];

  barData: any;

  barOptions: any;

  pieData: any;

  pieOptions: any;

  products: any[] = [];

  subscription: Subscription;

  cols: any[] = [];

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

     menuItems: MenuItem[] = [];
      chartData: any;


  constructor(private layoutService: LayoutService,
    private statService: StatistiqueDTOService) {
    this.subscription = this.layoutService.configUpdate$.subscribe(config => {
      this.initCharts();
    });
  }

  ngOnInit(): void {
    //debut


    this.menuItems = [
            {
              label: 'File',
              items: [
                  {label: 'New', icon: 'pi pi-fw pi-plus'},
                  {label: 'Open', icon: 'pi pi-fw pi-download'}
              ]
            },
            {
              label: 'Edit',
              items: [
                  {label: 'Undo', icon: 'pi pi-fw pi-undo'},
                  {label: 'Redo', icon: 'pi pi-fw pi-refresh'}
              ]
            }
        ];

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Data 1',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#42A5F5',
                    tension: 0.4
                },
                {
                    label: 'Data 2',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#FFA726',
                    tension: 0.4
                }
            ]
        };


    //fin
    this.annee = new Date();
    this.year = this.annee.getFullYear();
    this.getAnnee(this.year);
    this.loadComptesActifs();
    this.weeks = [{
        label: 'Last Week',
        value: 0,
        data: [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]]
    },
    {
        label: 'This Week',
        value: 1,
        data: [[35, 19, 40, 61, 16, 55, 30], [48, 78, 10, 29, 76, 77, 10]]
    }];

    this.selectedWeek = this.weeks[0];
    this.initCharts();
    //this.productService.getProductsSmall().then(data => this.products = data);

    this.products = [
      {
        'id' : 1,

      }
    ]

    this.cols = [
        {header: 'Name', field: 'name'},
        {header: 'Category', field: 'category'},
        {header: 'Price', field: 'price'},
        {header: 'Status', field: 'inventoryStatus'}
    ]
}

onWeekChange(){

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


  ngOnDestroy(): void {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
  }

  initCharts() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.barData = {
        labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
        datasets: [
            {
                label: 'Revenue',
                backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                barThickness: 12,
                borderRadius: 12,
                data: this.selectedWeek.data[0]
            },
            {
                label: 'Profit',
                backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                barThickness: 12,
                borderRadius: 12,
                data: this.selectedWeek.data[1]
            }
        ]
    };

    this.pieData = {
        labels: ['Affiliation', 'Fashion', 'Household'],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    documentStyle.getPropertyValue('--primary-700'),
                    documentStyle.getPropertyValue('--primary-400'),
                    documentStyle.getPropertyValue('--primary-100')
                ],
                hoverBackgroundColor: [
                    documentStyle.getPropertyValue('--primary-600'),
                    documentStyle.getPropertyValue('--primary-300'),
                    documentStyle.getPropertyValue('--primary-200')
                ]
            }
        ]
    };

    this.barOptions = {
        animation: {
            duration: 0
        },
        plugins: {
            legend: {
                labels: {
                    color: textColor,
                    usePointStyle: true,
                    font: {
                        weight: 700,
                    },
                    padding: 28
                },
                position: 'bottom'
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };

    this.pieOptions = {
        animation: {
            duration: 0
        },
        plugins: {
            legend: {
                labels: {
                    color: textColor,
                    usePointStyle: true,
                    font: {
                        weight: 700,
                    },
                    padding: 28
                },
                position: 'bottom'
            }
        }
    };
}
}

