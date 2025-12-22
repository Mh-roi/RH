import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CURRENT_PAGE, MAX_SIZE_PAGE } from 'src/app/shared/constants/pagination.constants';
import { environment } from 'src/environments/environment';
import { Critere, ICritere } from 'src/app/shared/model/critere';
import { CritereService } from 'src/app/shared/service/critere.service';
import { CreerModifierCritereComponent } from './creer-modifier-critere/creer-modifier-critere.component';
import { DetailCritereComponent } from './detail-critere/detail-critere.component';

@Component({
  selector: 'app-critere',
  templateUrl: './critere.component.html',
  styleUrls: ['./critere.component.scss']
})
export class CritereComponent {    

  routeData: Subscription | undefined;
  critereListSubscription: Subscription | undefined;
  criteres: ICritere[] = [];
  critere: ICritere = new Critere();
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
    private critereService: CritereService,
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
          if (this.critereListSubscription) {
            this.critereListSubscription.unsubscribe();
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
        this.critereService.query(req).subscribe(result => {
          if (result && result.body) {
            this.totalRecords = result.body.length;
            this.criteres = result.body || [];
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
        this.dialogService.open(CreerModifierCritereComponent,
          {
            header: 'Ajouter un critère',
            width: '60%',
            contentStyle: { overflow: 'auto', },
            baseZIndex: 10000,
            maximizable: true,
            closable: true,
          }
        ).onClose.subscribe(result => {
          if(result) {
          this.criteres.push(result.body);
          this.isDialogOpInProgress = false;
          this.showMessage({ severity: 'success', summary: 'critère créé avec succès' });
          }
        });
      }

      /** Permet d'afficher un modal pour la modification */
      openModalEdit(critere: ICritere): void {
        this.dialogService.open(CreerModifierCritereComponent,
          {
            header: 'Modifier un critère',
            width: '60%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            closable: true,
            data: critere
          }).onClose.subscribe(result => {
            if(result){
              this.isDialogOpInProgress = false;
              this.loadAll();
              this.showMessage({ severity: 'success', summary: 'critère modifié avec succès' });
            }
           
          });

      }

      /** Permet d'afficher un modal pour voir les détails */
      openModalDetail(critere:ICritere): void {
        this.dialogService.open(DetailCritereComponent,
          {
            header: 'Details de categorie',
            width: '60%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            data: critere
          });
      }


      // Suppression
      onDelete(critere: ICritere) {
        this.confirmationService.confirm({
          message: 'Etes-vous sûr de vouloir supprimer ce critère ?',
          accept: () => {
            this.delete(critere);
          }
        });
      }

      delete(selection: any) {
        this.isOpInProgress = true;
        this.critereService.delete(selection.id).subscribe(() => {
          this.criteres = this.criteres.filter(critere => critere.id !== selection.id);
          selection = null;
          this.isOpInProgress = false;
          this.totalRecords--;
          this.showMessage({
            severity: 'success',
            summary: 'critère supprimé avec succès',
          });
        }, (error) => {
          console.error("critere " + JSON.stringify(error));
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
