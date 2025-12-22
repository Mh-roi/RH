import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CURRENT_PAGE, MAX_SIZE_PAGE } from 'src/app/shared/constants/pagination.constants';
import { IMinistere, Ministere } from 'src/app/shared/model/ministere';
import { MinistereService } from 'src/app/shared/service/ministere.service';
import { environment } from 'src/environments/environment';
import { CreerModifierMinistereComponent } from './creer-modifier-ministere/creer-modifier-ministere.component';
import { DetailsMinistereComponent } from './details-ministere/details-ministere.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ministere',
  templateUrl: './ministere.component.html',
  styleUrls: ['./ministere.component.scss']
})
export class MinistereComponent {


  routeData: Subscription | undefined;
  categorieListSubscription: Subscription | undefined;
  ministeres: IMinistere[] = [];
  ministere: IMinistere = new Ministere();
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
    private ministereService: MinistereService,
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
          if (this.categorieListSubscription) {
            this.categorieListSubscription.unsubscribe();
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
        this.ministereService.query(req).subscribe(result => {
          if (result && result.body) {
            this.totalRecords = Number(result.headers.get('X-Total-Count'));
            this.ministeres = result.body || [];
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
        this.dialogService.open(CreerModifierMinistereComponent,
          {
            header: 'Ajouter un ministere',
            width: '60%',
            contentStyle: { overflow: 'auto', },
            baseZIndex: 10000,
            maximizable: true,
            closable: true,
          }
        ).onClose.subscribe(result => {
          if(result) {
          this.ministeres.push(result.body);
          this.totalRecords++;
          this.isDialogOpInProgress = false;
          this.showMessage({ severity: 'success', summary: 'ministere creer avec succès' });
          }
        });
      }

      /** Permet d'afficher un modal pour la modification */
      openModalEdit(ministere: IMinistere): void {

        this.dialogService.open(CreerModifierMinistereComponent,
          {
            header: 'Modifier un ministere',
            width: '60%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            closable: true,
            data: ministere
          }).onClose.subscribe(result => {
            if(result){
              this.isDialogOpInProgress = false;

              this.loadAll();
              this.showMessage({ severity: 'success', summary: 'ministere modifié avec succès' });
            }

          });

      }

      /** Permet d'afficher un modal pour voir les détails */
      openModalDetail(ministere:IMinistere): void {
        this.dialogService.open(DetailsMinistereComponent,
          {
            header: 'Details de ministere',
            width: '60%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            data: ministere
          });
      }


      // Suppression
      onDelete(ministere: IMinistere) {
        this.confirmationService.confirm({
          message: 'Etes-vous sur de vouloir supprimer ce ministere?',
          accept: () => {
            this.delete(ministere);
          }
        });
      }

      delete(selection: any) {
        this.isOpInProgress = true;
        this.ministereService.delete(selection.id).subscribe(() => {
          this.ministeres = this.ministeres.filter(ministere => ministere.id !== selection.id);
          selection = null;
          this.isOpInProgress = false;
          this.totalRecords--;
          this.showMessage({
            severity: 'success',
            summary: 'ministere supprimé avec succès',
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
