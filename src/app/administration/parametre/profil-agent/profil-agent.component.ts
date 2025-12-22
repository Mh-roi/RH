import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CURRENT_PAGE, MAX_SIZE_PAGE } from 'src/app/shared/constants/pagination.constants';
import { IProfilAgent, ProfilAgent } from 'src/app/shared/model/profil-agent';
import { ProfilAgentService } from 'src/app/shared/service/profil-agent.service';
import { environment } from 'src/environments/environment';
import { CreerModifierProfilAgentComponent } from './creer-modifier-profil-agent/creer-modifier-profil-agent.component';
import { DetailProfilAgentComponent } from './detail-profil-agent/detail-profil-agent.component';

@Component({
  selector: 'app-profil-agent',
  templateUrl: './profil-agent.component.html',
  styleUrls: ['./profil-agent.component.scss']
})
export class ProfilAgentComponent implements OnInit, OnDestroy {
  routeData: Subscription | undefined;
  profilAgentListSubscription: Subscription | undefined;
  profilAgents: IProfilAgent[] = [];
  profilAgent: IProfilAgent = new ProfilAgent();
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
  filtreLibelle: string ="";

  constructor(
    private profilAgentService: ProfilAgentService,
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
          if (this.profilAgentListSubscription) {
            this.profilAgentListSubscription.unsubscribe();
          }
        }
      }

      // filtrer(): void {
      //   this.loadAll();
      // }

      filtrer() {
        if (this.filtreLibelle.trim().length > 0) {
          this.profilAgents = this.profilAgents.filter(profilAgent =>
            profilAgent.libelle?.toLocaleLowerCase().includes(this.filtreLibelle.toLocaleLowerCase())
          );
        } else {
          this.loadAll();
        }
        this.totalRecords = this.profilAgents.length;
      }

    
      resetFilter(): void {
        this.filtreLibelle = "";
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
        this.profilAgentService.query(req).subscribe(result => {
          if (result && result.body) {
            this.totalRecords = Number(result.headers.get('X-Total-Count'));
            this.profilAgents = result.body || [];
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
        this.dialogService.open(CreerModifierProfilAgentComponent,
          {
            header: 'Ajouter un profi d\'agent',
            width: '60%',
            contentStyle: { overflow: 'auto', },
            baseZIndex: 10000,
            maximizable: true,
            closable: true,
          }
        ).onClose.subscribe(result => {
          if(result) {
          this.profilAgents.push(result.body);
          this.isDialogOpInProgress = false;
          this.showMessage({ severity: 'success', summary: 'profilAgent creer avec succès' });
          }
        });
      }

      /** Permet d'afficher un modal pour la modification */
      openModalEdit(profilAgent: IProfilAgent): void {
        this.dialogService.open(CreerModifierProfilAgentComponent,
          {
            header: 'Modifier un profi d\'agent',
            width: '60%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            closable: true,
            data: profilAgent
          }).onClose.subscribe(result => {
            if(result){
              this.isDialogOpInProgress = false;
              this.loadAll();
              this.showMessage({ severity: 'success', summary: 'profilAgent modifié avec succès' });
            }
           
          });

      }

      /** Permet d'afficher un modal pour voir les détails */
      openModalDetail(profilAgent:IProfilAgent): void {
        this.dialogService.open(DetailProfilAgentComponent,
          {
            header: 'Details de profil d\'agent',
            width: '60%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            data: profilAgent
          });
      }


      // Suppression
      onDelete(profilAgent: IProfilAgent) {
        this.confirmationService.confirm({
          message: 'Etes-vous sur de vouloir supprimer ce profilAgent?',
          accept: () => {
            this.delete(profilAgent);
          }
        });
      }

      delete(selection: any) {
        this.isOpInProgress = true;
        this.profilAgentService.delete(selection.id).subscribe(() => {
          this.profilAgents = this.profilAgents.filter(profilAgent => profilAgent.id !== selection.id);
          selection = null;
          this.isOpInProgress = false;
          this.totalRecords--;
          this.showMessage({
            severity: 'success',
            summary: 'profilAgent supprimé avec succès',
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
