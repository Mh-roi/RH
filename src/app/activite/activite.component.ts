import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CURRENT_PAGE, MAX_SIZE_PAGE } from 'src/app/shared/constants/pagination.constants';
import { Activite, IActivite } from 'src/app/shared/model/activite';
import { ActiviteService } from 'src/app/shared/service/activite.service';
import { environment } from 'src/environments/environment';
import { CreerModifierActiviteComponent } from './creer-modifier-activite/creer-modifier-activite.component';
import { DetailActiviteComponent } from './detail-activite/detail-activite.component';
import { TokenStorageService } from '../shared/service/token-storage.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-activite',
  templateUrl: './activite.component.html',
  styleUrls: ['./activite.component.scss']
})
export class ActiviteComponent {
    

  routeData: Subscription | undefined;
  activiteListSubscription: Subscription | undefined;
  activites: IActivite[] = [];
  activite: IActivite = new Activite();
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
  matricule!: string;
  anneeActu! : Date;
  isLoggedIn = false;
  matriculeAgent!: string;
  showDialogUpdate = false;
  messageService: any;
  selection: any;

  

  constructor(
    private activiteService: ActiviteService,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private dialogRef: DynamicDialogRef,
    private router: Router,
    private confirmationService: ConfirmationService,
    private tokenStorageService: TokenStorageService,
    ){}


   ngOnInit(): void { 
      this.anneeActu =new Date();
      this.matriculeAgent = this.activatedRoute.snapshot.params['matricule'];
      this.isLoggedIn = !!this.tokenStorageService.getToken();
      if (this.isLoggedIn){
        const user = this.tokenStorageService.getUser();
        this.matricule = user.matricule;
      }
        this.activatedRoute.data.subscribe(
          () => {
            this.loadAll();
          }
        );
      }

      ngOnDestroy(): void {
        if (this.routeData) {
          this.routeData.unsubscribe();
          if (this.activiteListSubscription) {
            this.activiteListSubscription.unsubscribe();
            
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

      loadAll(event?: LazyLoadEvent) {
   
        this.isLoading = true;
        this.activiteService.getAll(this.matricule,this.anneeActu.getFullYear(),event).subscribe(response => {
          this.isLoading = false;
          this.activites = response.activites;
           console.log(response)
          this.totalRecords = response.activites.length;
        }, error => {
          this.message = { severity: 'error', summary: error.error };
          console.error(JSON.stringify(error));
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
        this.dialogService.open(CreerModifierActiviteComponent,
          {
            header: 'Ajouter une activite',
            width: '60%',
            contentStyle: { overflow: 'auto', },
            baseZIndex: 10000,
            maximizable: true,
            closable: true,
          }
        ).onClose.subscribe(result => {
          if(result) {
          this.activites.push(result.body);
          this.isDialogOpInProgress = false;
          this.showMessage({ severity: 'success', summary: 'activite creer avec succès' });
          this.loadAll();
          }
        });
      }

      /** Permet d'afficher un modal pour la modification */
      openModalEdit(activite: IActivite): void {
        this.dialogService.open(CreerModifierActiviteComponent,
          {
            header: 'Modifier une activite',
            width: '60%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            closable: true,
            data: activite
          }).onClose.subscribe(result => {
            if(result){
              this.isDialogOpInProgress = false;
              this.loadAll();
              this.showMessage({ severity: 'success', summary: 'activité modifié avec succès' });
            }
           
          });

      }

      /** Permet d'afficher un modal pour voir les détails */
      openModalDetail(activite:IActivite): void {
        this.dialogService.open(DetailActiviteComponent,
          {
            header: 'Details de activite',
            width: '60%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            data: activite
          });
      }

      edit() {
        this.clearDialogMessages();
        this.isDialogOpInProgress = true;
        this.activiteService.updatePropose(this.activite,this.matriculeAgent).subscribe(response => {
          let index = this.activites.findIndex(activite => activite.id === response.id);
          this.activites[index] = response;
          this.isDialogOpInProgress = false;
          this.showDialogUpdate = false;
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Activité modifiée avec succès', life: 5000 });
        }, error => this.handleError(error));
      }

      isEditing() {
        return !!this.activite.id;
      }
      onInfo(selection:any){
        console.log(selection);
      }

      onEdit(activite?: Activite) {
        if (activite) this.selection = activite;
        this.clearDialogMessages();
        this.activite = Object.assign({}, this.selection);
        this.showDialogUpdate = true;
      }
      // Suppression
      onDelete(activite: IActivite) {
        this.confirmationService.confirm({
          message: 'Etes-vous sur de vouloir supprimer cette activite?',
          accept: () => {
            this.delete(activite);
          }
        });
      }

      delete(selection: any) {
        this.isOpInProgress = true;
        this.activiteService.delete(selection.id).subscribe(() => {
          this.activites = this.activites.filter(activite => activite.id !== selection.id);
          selection = null;
          this.isOpInProgress = false;
          this.totalRecords--;
          this.showMessage({
            severity: 'success',
            summary: 'activite supprimée avec succès',
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
      clear(): void {
        this.dialogRef.close();
        this.dialogRef.destroy();
    }

      showMessage(message: Message) {
        this.message = message;
        this.timeoutHandle = setTimeout(() => {
          this.message = null;
        }, 5000);
      }
}
