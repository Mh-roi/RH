import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CURRENT_PAGE, MAX_SIZE_PAGE } from 'src/app/shared/constants/pagination.constants';
import { IStructure, Structure } from 'src/app/shared/model/structure';
import { StructureService } from 'src/app/shared/service/structure.service';
import { environment } from 'src/environments/environment';
import { CreateModifierStructureComponent } from './create-modifier-structure/create-modifier-structure.component';
import { DetailsStructureComponent } from './details-structure/details-structure.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.scss']
})
export class StructureComponent implements OnInit, OnDestroy {

   routeData: Subscription | undefined;
    StructureListSubscription: Subscription | undefined;
    structures: IStructure[] = [];
    structure: IStructure = new Structure();
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
      private structureService: StructureService,
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
            if (this.StructureListSubscription) {
              this.StructureListSubscription.unsubscribe();
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
          this.structureService.query(req).subscribe(result => {
            if (result && result.body) {
              console.log("****************************STRUCTURE********************************",result.body)
              this.totalRecords = Number(result.headers.get('X-Total-Count'));
              this.structures = result.body || [];
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
          this.dialogService.open(CreateModifierStructureComponent,
            {
              header: 'Ajouter une Structure',
              width: '60%',
              contentStyle: { overflow: 'auto', },
              baseZIndex: 10000,
              maximizable: true,
              closable: true,
            }
          ).onClose.subscribe(result => {
            if(result) {
            this.structures.push(result.body);
            this.isDialogOpInProgress = false;
            this.showMessage({ severity: 'success', summary: 'Structure creer avec succès' });
            }
          });
        }
  
        /** Permet d'afficher un modal pour la modification */
        openModalEdit(Structure: IStructure): void {
          this.dialogService.open(CreateModifierStructureComponent,
            {
              header: 'Modifier un Structure',
              width: '60%',
              contentStyle: { overflow: 'auto' },
              baseZIndex: 10000,
              maximizable: true,
              closable: true,
              data: Structure
            }).onClose.subscribe(result => {
              if(result){
                this.isDialogOpInProgress = false;
                this.loadAll();
                this.showMessage({ severity: 'success', summary: 'Structure modifié avec succès' });
              }
             
            });
  
        }
  
        /** Permet d'afficher un modal pour voir les détails */
        openModalDetail(structure:IStructure): void {
          this.dialogService.open(DetailsStructureComponent,
            {
              header: 'Details de Structure',
              width: '60%',
              contentStyle: { overflow: 'auto' },
              baseZIndex: 10000,
              maximizable: true,
              data: structure
            });
        }
  
  
        // Suppression
        onDelete(Structure: IStructure) {
          this.confirmationService.confirm({
            message: 'Etes-vous sur de vouloir supprimer ce Structure?',
            accept: () => {
              this.delete(Structure);
            }
          });
        }
  
        delete(selection: any) {
          this.isOpInProgress = true;
          this.structureService.delete(selection.id).subscribe(() => {
            this.structures = this.structures.filter(structure => structure.id !== selection.id);
            selection = null;
            this.isOpInProgress = false;
            this.totalRecords--;
            this.showMessage({
              severity: 'success',
              summary: 'Structure supprimé avec succès',
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
