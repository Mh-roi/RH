import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CURRENT_PAGE, MAX_SIZE_PAGE } from 'src/app/shared/constants/pagination.constants';
import { FichesPoste, IFichesPoste } from 'src/app/shared/model/fiches-poste';
import { FichesPosteService } from 'src/app/shared/service/fiches-poste.service';
import { environment } from 'src/environments/environment';
import { CreerModifierfichesPosteComponent } from './creer-modifier-fiches-poste/creer-modifier-fiches-poste.component';
import { DetailFichesPosteComponent } from './detail-fiches-poste/detail-fiches-poste.component';
import { HttpErrorResponse } from '@angular/common/http';
import * as saveAs from 'file-saver';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';

@Component({
  selector: 'app-fiches-poste',
  templateUrl: './fiches-poste.component.html',
  styleUrls: ['./fiches-poste.component.scss']
})
export class FichesPosteComponent {

  userProfil: string = '';
  routeData: Subscription | undefined;
  fichesPosteListSubscription: Subscription | undefined;
  fichesPostes: IFichesPoste[] = [];
  
  fichesPoste: IFichesPoste = new FichesPoste();
  timeoutHandle: any;
  totalRecords: number = 0;
  recordsPerPage = environment.recordsPerPage;
  enableBtnInfo = true;
  enableBtnDownload = true;
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
  selection: any;
  //itemsPerPage = ITEMS_PER_PAGE2;
  predicate!: string;
  ascending!: boolean;
  reverse: any;
  filtreLibelle: string ='';
  isLoggedIn = false;

  constructor(
    private fichesPosteService: FichesPosteService,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private dialogRef: DynamicDialogRef,
    private router: Router,
    private confirmationService: ConfirmationService,
    private tokenStorageService:TokenStorageService
    ){}


   ngOnInit(): void { 
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    console.log("======================================================",this.isLoggedIn);
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
    this.userProfil = user.profil;
    console.log("======================================================>",this.userProfil);
        this.activatedRoute.data.subscribe(
          () => {
            this.loadAll();

         //   this.userProfil ='ROLE_DRH'
          }
        );
      }
    }
   

      ngOnDestroy(): void {
        if (this.routeData) {
          this.routeData.unsubscribe();
          if (this.fichesPosteListSubscription) {
            this.fichesPosteListSubscription.unsubscribe();
          }
        }
      }

      // filtrer(): void {
      //   this.loadAll();
      // }
    
      filtrer() {
        if (this.filtreLibelle.trim().length > 0) {
          this.fichesPostes = this.fichesPostes.filter(fichesPoste =>
           fichesPoste.libelle?.toLocaleLowerCase().includes(this.filtreLibelle.toLocaleLowerCase())
          );
        } else {
          this.loadAll();
        }
        this.totalRecords = this.fichesPostes.length;
      }
      
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
        this.fichesPosteService.query(req).subscribe(result => {
          if (result && result.body) {
            this.totalRecords = Number(result.headers.get('X-Total-Count'));
            this.fichesPostes = result.body || [];
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
        this.dialogService.open(CreerModifierfichesPosteComponent,
          {
            header: 'Ajouter une fichesPoste',
            width: '60%',
            contentStyle: { overflow: 'auto', },
            baseZIndex: 10000,
            maximizable: true,
            closable: true,
          }
        ).onClose.subscribe(result => {
          if(result) {
          this.fichesPostes.push(result.body);
          this.isDialogOpInProgress = false;
          this.showMessage({ severity: 'success', summary: 'fichesPoste creer avec succès' });
          }
        });
      }

      /** Permet d'afficher un modal pour la modification */
      openModalEdit(fichesPoste: IFichesPoste): void {
        this.dialogService.open(CreerModifierfichesPosteComponent,
          {
            header: 'Modifier un fichesPoste',
            width: '60%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            closable: true,
            data: fichesPoste
          }).onClose.subscribe(result => {
            if(result){
              this.isDialogOpInProgress = false;
              this.loadAll();
              this.showMessage({ severity: 'success', summary: 'fichesPoste modifié avec succès' });
            }
           
          });

      }

      /** Permet d'afficher un modal pour voir les détails */
      openModalDetail(fichesPoste:IFichesPoste): void {
        this.dialogService.open(DetailFichesPosteComponent,
          {
            header: 'Details de fichesPoste',
            width: '60%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            data: fichesPoste
          });
      }


      // Suppression
      onDelete(fichesPoste: IFichesPoste) {
        this.confirmationService.confirm({
          message: 'Etes-vous sur de vouloir supprimer ce fichesPoste?',
          accept: () => {
            this.delete(fichesPoste);
          }
        });
      }

      delete(selection: any) {
        this.isOpInProgress = true;
        this.fichesPosteService.delete(selection.id).subscribe(() => {
          this.fichesPostes = this.fichesPostes.filter(fichesPoste => fichesPoste.id !== selection.id);
          selection = null;
          this.isOpInProgress = false;
          this.totalRecords--;
          this.showMessage({
            severity: 'success',
            summary: 'fichesPoste supprimé avec succès',
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

      onDownload(fichesPoste?: FichesPoste){
        if (fichesPoste) this.selection = fichesPoste;
        this.fichesPoste = Object.assign({}, this.selection);
        this.showDialog = true;
        this.downloadFiche(this.fichesPoste);
      }
  
      downloadFiche(fichesPoste?: FichesPoste){
        this.fichesPosteService.downloadFile(fichesPoste?.url!).subscribe(
          blob => saveAs(blob, fichesPoste?.libelle)
        );
      }
}
