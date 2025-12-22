import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CURRENT_PAGE, MAX_SIZE_PAGE } from 'src/app/shared/constants/pagination.constants';
import { Categorie, ICategorie } from 'src/app/shared/model/categorie';
import { CategorieService } from 'src/app/shared/service/categorie.service';
import { environment } from 'src/environments/environment';
import { CreerModifierCategorieComponent } from './creer-modifier-categorie/creer-modifier-categorie.component';
import { DetailCategorieComponent } from './detail-categorie/detail-categorie.component';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit, OnDestroy {
    

  routeData: Subscription | undefined;
  categorieListSubscription: Subscription | undefined;
  categories: ICategorie[] = [];
  categorie: ICategorie = new Categorie();
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
  filtreLibelle: string =''


  

  constructor(
    private categorieService: CategorieService,
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

      // filtrer(): void {
      //   this.loadAll();
      // }
    
      /////////////////////////////////////////////////////////////////////

      filtrer() {
        // Appliquer le filtre en fonction du libellé (assurez-vous que le champ de recherche est non vide)
        if (this.filtreLibelle.trim().length > 0) {
          this.categories = this.categories.filter(categorie =>

            categorie.libelle?.toLocaleLowerCase().includes(this.filtreLibelle.toLocaleLowerCase())
            //this.categorie.libelle.toLowerCase().includes(this.filtreLibelle.toLowerCase())
          );
        } else {
          // Si le champ de recherche est vide, réinitialisez la liste des catégories
          this.loadAll();
        }
        // Réinitialisez le nombre total d'enregistrements pour refléter le nombre filtré
        this.totalRecords = this.categories.length;
      }
      

      //////////////////////////////////////////////////////////////////////////////
      resetFilter(): void {
        this.filtreLibelle = '';
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
        this.categorieService.query(req).subscribe(result => {
          if (result && result.body) {
            this.totalRecords = Number(result.headers.get('X-Total-Count'));
            this.categories = result.body || [];
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
        this.dialogService.open(CreerModifierCategorieComponent,
          {
            header: 'Ajouter une categorie',
            width: '60%',
            contentStyle: { overflow: 'auto', },
            baseZIndex: 10000,
            maximizable: true,
            closable: true,
          }
        ).onClose.subscribe(result => {
          if(result) {
          this.categories.push(result.body);
          this.isDialogOpInProgress = false;
          this.showMessage({ severity: 'success', summary: 'categorie creer avec succès' });
          }
        });
      }

      /** Permet d'afficher un modal pour la modification */
      openModalEdit(categorie: ICategorie): void {
        this.dialogService.open(CreerModifierCategorieComponent,
          {
            header: 'Modifier un categorie',
            width: '60%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            closable: true,
            data: categorie
          }).onClose.subscribe(result => {
            if(result){
              this.isDialogOpInProgress = false;
              this.loadAll();
              this.showMessage({ severity: 'success', summary: 'categorie modifié avec succès' });
            }
           
          });

      }

      /** Permet d'afficher un modal pour voir les détails */
      openModalDetail(categorie:ICategorie): void {
        this.dialogService.open(DetailCategorieComponent,
          {
            header: 'Details de categorie',
            width: '60%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            data: categorie
          });
      }


      // Suppression
      onDelete(categorie: ICategorie) {
        this.confirmationService.confirm({
          message: 'Etes-vous sur de vouloir supprimer cette categorie?',
          accept: () => {
            this.delete(categorie);
          }
        });
      }

      delete(selection: any) {
        this.isOpInProgress = true;
        this.categorieService.delete(selection.id).subscribe(() => {
          this.categories = this.categories.filter(categorie => categorie.id !== selection.id);
          selection = null;
          this.isOpInProgress = false;
          this.totalRecords--;
          this.showMessage({
            severity: 'success',
            summary: 'categorie supprimée avec succès',
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
