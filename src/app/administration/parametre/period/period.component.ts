import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CURRENT_PAGE, MAX_SIZE_PAGE } from 'src/app/shared/constants/pagination.constants';
import { IPeriode, Periode } from 'src/app/shared/model/period';
import { PeriodService } from 'src/app/shared/service/period.service';
import { environment } from 'src/environments/environment';
import { CreerModifierPeriodComponent } from './creer-modifier-period/creer-modifier-period.component';
import { DetailPeriodComponent } from './detail-period/detail-period.component';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent {
  routeData: Subscription | undefined;
  periodeListSubscription: Subscription | undefined;
  periodes: IPeriode[] = [];
  periode: IPeriode = new Periode();
  timeoutHandle: any;
  totalRecords: number = 0;
  recordsPerPage = environment.recordsPerPage;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete=true;
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


  

  constructor(
    private periodService: PeriodService,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private dialogRef: DynamicDialogRef,
    private router: Router,
    private confirmationService: ConfirmationService
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
          if (this.periodeListSubscription) {
            this.periodeListSubscription.unsubscribe();
          }
        }
      }

      filtrer(): void {
        this.loadAll();
      }
    
      resetFilter(): void {
        this.filtreLibelle = undefined;
        this.filtrer();
      }

      loadPage(event:any): void {
        if(event){
          this.page = event.first/event.rows + 1; 
          this.recordsPerPage = event.rows;
        }
        this.transition();
      }
    
      transition(): void {
        this.router.navigate(['./'], {
          relativeTo: this.activatedRoute.parent,
          queryParams: {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
          },
        });
        this.loadAll();
      }

      loadAll(): void {
        const req = this.buildReq();
        this.periodService.query(req).subscribe(result => {
          if (result && result.body) {
           // this.totalRecords = Number(result.headers.get('X-Total-Count'));
            this.periodes = result.body || [];
          }
          
        });
      }
      
        
      sortMethod(): string[] {
        this.predicate = 'id';
        this.reverse = true;
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        return result;
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


      /** Permet d'afficher un modal pour l'ajout */
      openModalCreate(): void {
        this.dialogService.open(CreerModifierPeriodComponent,
          {
            header: 'Ajouter une periode',
            width: '60%',
            height:'100%',
            contentStyle: { overflow: 'auto', },
            baseZIndex: 10000,
            maximizable: true,
            closable: true,
          }
        ).onClose.subscribe(result => {
          if(result) {
          this.periodes.push(result.body);
          this.isDialogOpInProgress = false;
          this.showMessage({ severity: 'success', summary: 'periode creer avec succès' });
          }
        });
      }

      /** Permet d'afficher un modal pour la modification */
      openModalEdit(periode: IPeriode): void {
        this.dialogService.open(CreerModifierPeriodComponent,
          {
            header: 'Modifier un periode',
            width: '60%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            closable: true,
            data: periode
          }).onClose.subscribe(result => {
            if(result){
              this.isDialogOpInProgress = false;
              this.loadAll();
              this.showMessage({ severity: 'success', summary: 'periode modifié avec succès' });
            }
           
          });

      }

      /** Permet d'afficher un modal pour voir les détails */
      openModalDetail(periode:IPeriode): void {
        this.dialogService.open(DetailPeriodComponent,
          {
            header: 'Details de periode',
            width: '60%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            data: periode
          });
      }


      // Suppression
      onDelete(periode: IPeriode) {
        this.confirmationService.confirm({
          message: 'Etes-vous sur de vouloir supprimer ce periode?',
          accept: () => {
            this.delete(periode);
          }
        });
      }

      delete(selection: any) {
        this.isOpInProgress = true;
        this.periodService.delete(selection.id).subscribe(() => {
          this.periodes = this.periodes.filter(periode => periode.id !== selection.id);
          selection = null;
          this.isOpInProgress = false;
          this.totalRecords--;
          this.showMessage({
            severity: 'success',
            summary: 'periode supprimé avec succès',
          });
        }, (error) => {
          console.error("commune " + JSON.stringify(error));
          this.isOpInProgress = false;
          this.showMessage({ severity: 'error', summary: error.error.message });
        });
      }
      // Errors
      handleError(error: HttpErrorResponse) {
        console.error(`Processing Error: ${JSON.stringify(error)}`);
        this.isDialogOpInProgress = false;
        this.dialogErrorMessage = error.error.title;
      }
      // Messages

      clearDialogMessages() {
        this.dialogErrorMessage = null;
      }

      showMessage(message: Message) {
        this.message = message;
        this.timeoutHandle = setTimeout(() => {
          this.message = null;
        }, 5000);
      }
}
