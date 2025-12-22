import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CURRENT_PAGE, MAX_SIZE_PAGE } from 'src/app/shared/constants/pagination.constants';
import { FPParameter, IFPParameter } from 'src/app/shared/model/fp-parameter';
import { FPParameterService } from 'src/app/shared/service/fp-parameter.service';
import { environment } from 'src/environments/environment';
import { CreerModifierFpParameterComponent } from './creer-modifier-fp-parameter/creer-modifier-fp-parameter.component';
import { DetailsFpParameterComponent } from './details-fp-parameter/details-fp-parameter.component';


@Component({
  selector: 'app-fp-parameter',
  templateUrl: './fp-parameter.component.html',
  styleUrls: ['./fp-parameter.component.scss']
})
export class FpParameterComponent implements OnInit, OnDestroy {
  
  routeData: Subscription | undefined;
  fPParameterListSubscription: Subscription | undefined;
  fPParameters: IFPParameter[] = [];
  fPParameter: IFPParameter = new FPParameter();
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

  constructor(
    private fPParameterService: FPParameterService,
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
          if (this.fPParameterListSubscription) {
            this.fPParameterListSubscription.unsubscribe();
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
        this.fPParameterService.query(req).subscribe(result => {
          if (result && result.body) {
            this.totalRecords = Number(result.headers.get('X-Total-Count'));
            this.fPParameters = result.body || [];
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
        this.dialogService.open(CreerModifierFpParameterComponent,
          {
            header: 'Ajouter une fPParameter',
            width: '60%',
            contentStyle: { overflow: 'auto', },
            baseZIndex: 10000,
            maximizable: true,
            closable: true,
          }
        ).onClose.subscribe(result => {
          if(result) {
          this.fPParameters.push(result.body);
          this.totalRecords++;
          this.isDialogOpInProgress = false;
          this.showMessage({ severity: 'success', summary: 'fPParameter creer avec succès' });
          }
        });
      }

      /** Permet d'afficher un modal pour la modification */
      openModalEdit(fPParameter: IFPParameter): void {
        this.dialogService.open(CreerModifierFpParameterComponent,
          {
            header: 'Modifier un fPParameter',
            width: '60%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            closable: true,
            data: fPParameter
          }).onClose.subscribe(result => {
            if(result){
              this.isDialogOpInProgress = false;
              this.loadAll();
              this.showMessage({ severity: 'success', summary: 'fPParameter modifié avec succès' });
            }
           
          });

      }

      /** Permet d'afficher un modal pour voir les détails */
      openModalDetail(fPParameter:IFPParameter): void {
        this.dialogService.open(DetailsFpParameterComponent,
          {
            header: 'Details de fPParameter',
            width: '60%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            data: fPParameter
          });
      }


      // Suppression
      onDelete(fPParameter: IFPParameter) {
        this.confirmationService.confirm({
          message: 'Etes-vous sur de vouloir supprimer cette fPParameter?',
          accept: () => {
            this.delete(fPParameter);
          }
        });
      }

      delete(selection: any) {
        this.isOpInProgress = true;
        this.fPParameterService.delete(selection.id).subscribe(() => {
          this.fPParameters = this.fPParameters.filter(fPParameter => fPParameter.id !== selection.id);
          selection = null;
          this.isOpInProgress = false;
          this.totalRecords--;
          this.showMessage({
            severity: 'success',
            summary: 'fPParameter supprimée avec succès',
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
