import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CURRENT_PAGE, MAX_SIZE_PAGE } from 'src/app/shared/constants/pagination.constants';
import { IObjectif, Objectif } from 'src/app/shared/model/objectif';
import { ObjectifService } from 'src/app/shared/service/objectif.service';
import { environment } from 'src/environments/environment';
import { CreerModifierObjectifComponent } from './creer-modifier-objectif/creer-modifier-objectif.component';
import { DetailsObjectifComponent } from './details-objectif/details-objectif.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-objectif',
  templateUrl: './objectif.component.html',
  styleUrls: ['./objectif.component.scss']
})
export class ObjectifComponent implements OnInit, OnDestroy {

  routeData: Subscription | undefined;
  FonctionListSubscription: Subscription | undefined;
  objectifs: IObjectif[] = [];
  objectif: IObjectif = new Objectif();
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

   ngOnInit(): void { 
        this.activatedRoute.data.subscribe(
          () => {
            this.loadAll();
          }
        );
      }

       constructor(
          private objectifService: ObjectifService,
          private activatedRoute: ActivatedRoute,
          private dialogService: DialogService,
          private dialogRef: DynamicDialogRef,
          private router: Router,
          private confirmationService: ConfirmationService
          ){}




          ngOnDestroy(): void {
        if (this.routeData) {
          this.routeData.unsubscribe();
          if (this.FonctionListSubscription) {
            this.FonctionListSubscription.unsubscribe();
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
              this.objectifService.query(req).subscribe(result => {
                if (result && result.body) {
                  this.totalRecords = Number(result.headers.get('X-Total-Count'));
                  this.objectifs = result.body || [];
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
              this.dialogService.open(CreerModifierObjectifComponent,
                {
                  header: 'Ajouter un objectif',
                  width: '60%',
                  contentStyle: { overflow: 'auto', },
                  baseZIndex: 10000,
                  maximizable: true,
                  closable: true,
                }
              ).onClose.subscribe(result => {
                if(result) {
                this.objectifs.push(result.body);
                this.isDialogOpInProgress = false;
                this.showMessage({ severity: 'success', summary: 'Fonction creer avec succès' });
                }
              });
            }
      
            /** Permet d'afficher un modal pour la modification */
            openModalEdit(objectif: IObjectif): void {
              this.dialogService.open(CreerModifierObjectifComponent,
                {
                  header: 'Modifier un objectif',
                  width: '60%',
                  contentStyle: { overflow: 'auto' },
                  baseZIndex: 10000,
                  maximizable: true,
                  closable: true,
                  data: objectif
                }).onClose.subscribe(result => {
                  if(result){
                    this.isDialogOpInProgress = false;
                    this.loadAll();
                    this.showMessage({ severity: 'success', summary: 'Fonction modifié avec succès' });
                  }
                 
                });
      
            }
      
            /** Permet d'afficher un modal pour voir les détails */
            openModalDetail(objectif:IObjectif): void {
              this.dialogService.open(DetailsObjectifComponent,
                {
                  header: 'Details  objectif',
                  width: '60%',
                  contentStyle: { overflow: 'auto' },
                  baseZIndex: 10000,
                  maximizable: true,
                  data: objectif
                });
            }
      
      
            // Suppression
            onDelete(objectif: IObjectif) {
              this.confirmationService.confirm({
                message: 'Etes-vous sur de vouloir supprimer cet objectif?',
                accept: () => {
                  this.delete(objectif);
                }
              });
            }
      
            delete(selection: any) {
              this.isOpInProgress = true;
              this.objectifService.delete(selection.id).subscribe(() => {
                this.objectifs = this.objectifs.filter(objectif => objectif.id !== selection.id);
                selection = null;
                this.isOpInProgress = false;
                this.totalRecords--;
                this.showMessage({
                  severity: 'success',
                  summary: 'Indicateur supprimé avec succès',
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
