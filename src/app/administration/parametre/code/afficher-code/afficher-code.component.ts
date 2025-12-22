import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CURRENT_PAGE, MAX_SIZE_PAGE } from 'src/app/shared/constants/pagination.constants';
import { IFonctionnaire, Fonctionnaire } from 'src/app/shared/model/fonctionnaire';
import { FonctionnaireService } from 'src/app/shared/service/fonctionnaire.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-afficher-code',
  templateUrl: './afficher-code.component.html',
  styleUrls: ['./afficher-code.component.scss']
})
export class AfficherCodeComponent {
  routeData: Subscription | undefined;
  fonctionnaireListSubscription: Subscription | undefined;
  fonctionnaires: IFonctionnaire[] = [];
  fonctionnaire: IFonctionnaire = new Fonctionnaire();
  timeoutHandle: any;
  totalRecords: number = 0;
  recordsPerPage = environment.recordsPerPage;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete=false;
  enableCreate = true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  regionDetail: boolean=false;
  message: any;
  dialogErrorMessage: any;
  page = CURRENT_PAGE;
  previousPage?: number;
  maxSize = MAX_SIZE_PAGE;
  //itemsPerPage = ITEMS_PER_PAGE2;
  predicate!: string;
  ascending!: boolean;
  reverse: any;
  filtreLibelle: string | undefined;
  saveSuccess: boolean = false;
  codePresent: boolean = false;
  code: boolean = false;
  message1: any;
  superieur!: Fonctionnaire;
  newCodeAffiliation!: string;
  oldCodeAffiliation!: string;
  motif!: string;
  reference!: string;
  submitted!: boolean;
  showEnregistrerButton: boolean = false;

  constructor(
    private fonctionnaireService: FonctionnaireService,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private dialogRef: DynamicDialogRef,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
    ){}


   ngOnInit(): void { 
        this.activatedRoute.data.subscribe(
          () => {
            this.loadAll();
          }
        );
      }

      ngOnDestroy(): void {
        if (this.routeData) {
          this.routeData.unsubscribe();
          if (this.fonctionnaireListSubscription) {
            this.fonctionnaireListSubscription.unsubscribe();
          }
        }
      }

      loadAll(): void {
        const req = this.buildReq();
        this.fonctionnaireService.query(req).subscribe(result => {
          if (result && result.body) {
            this.totalRecords = Number(result.headers.get('X-Total-Count'));
            this.fonctionnaires = result.body || [];
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

      afficherMonCode(){
        this.fonctionnaireService.afficherCodeAffiliation().subscribe(
          data => {
            this.fonctionnaire = data;
            this.message = 'Le code a ete recupere avec succes ';
            if(this.fonctionnaire.codeGenere == null){
              this.code = false;
              this.message = 'Vous n\'avez pas encore généré un code.\nPour générer un code allez à l\'onglet \"Générer code\" !';
            } else { this.code = true}
            this.saveSuccess = true;
                 },
          err => {
            this.message = err.message;
            this.saveSuccess = false;
          }
        );
      }

  
      
    
    

   
 
   

   
  
  
  
 

}
