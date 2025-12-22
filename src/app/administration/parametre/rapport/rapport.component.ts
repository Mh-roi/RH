import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CURRENT_PAGE, MAX_SIZE_PAGE } from 'src/app/shared/constants/pagination.constants';
import { environment } from 'src/environments/environment';
import { DetailsRapportComponent } from './details-rapport/details-rapport.component';
import { CreerModifierRapportComponent } from './creer-modifier-rapport/creer-modifier-rapport.component';
import { CertifierRapportComponent } from './certifier-rapport/certifier-rapport.component';
import { StatistiqueDTOService } from 'src/app/shared/service/statistique.service';
import { IRapport, Rapport } from 'src/app/shared/model/rapport';
import { RapportService } from 'src/app/shared/service/rapport.service';
@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss']
})
export class RapportComponent {



      routeData: Subscription | undefined;
      rapportListSubscription: Subscription | undefined;
      rapports: IRapport[] = [];
      rapport: IRapport = new Rapport();
      timeoutHandle: any;
      totalRecords: number = 0;
      recordsPerPage = environment.recordsPerPage;
      enableBtnInfo = true;
      enableBtnEdit = true;
      enableBtnDelete=true;
      enableCreate = true;
      enableBtnCertifierRapport=true
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
        private rapportService: RapportService,
        private activatedRoute: ActivatedRoute,
        private statistiqueDTOService:StatistiqueDTOService,
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
            this.loadAllRapportJson();
          }

          ngOnDestroy(): void {
            if (this.routeData) {
              this.routeData.unsubscribe();
              if (this.rapportListSubscription) {
                this.rapportListSubscription.unsubscribe();
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
              this.rapports = this.rapports.filter(rapport =>

                rapport.typerapport?.toLocaleLowerCase().includes(this.filtreLibelle.toLocaleLowerCase())
                //this.rapport.libelle.toLowerCase().includes(this.filtreLibelle.toLowerCase())
              );
            } else {
              // Si le champ de recherche est vide, réinitialisez la liste des catégories
              this.loadAll();
            }
            // Réinitialisez le nombre total d'enregistrements pour refléter le nombre filtré
            this.totalRecords = this.rapports.length;
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
            this.rapportService.query(req).subscribe(result => {
              if (result && result.body) {
                this.totalRecords = Number(result.headers.get('X-Total-Count'));
                this.rapports = result.body || [];
              }
            });
          }


           loadAllRapportJson(): void {
    this.statistiqueDTOService.getAllRapports().subscribe({
      next: (data) => {
        this.rapports = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des rapports', err);
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
            this.dialogService.open(CreerModifierRapportComponent,
              {
                header: 'Elaborer un Rapport',
                width: '60%',
                contentStyle: { overflow: 'auto', },
                baseZIndex: 10000,
                maximizable: true,
                closable: true,
              }
            ).onClose.subscribe(result => {
              if(result) {
              this.rapports.push(result.body);
              this.isDialogOpInProgress = false;
              this.showMessage({ severity: 'success', summary: 'Rapport creer avec succès' });
              }
            });
          }

          /** Permet d'afficher un modal pour la modification */
          openModalEdit(rapport: IRapport): void {
            this.dialogService.open(CreerModifierRapportComponent,
              {
                header: 'Modifier un Rapport',
                width: '60%',
                contentStyle: { overflow: 'auto' },
                baseZIndex: 10000,
                maximizable: true,
                closable: true,
                data: rapport
              }).onClose.subscribe(result => {
                if(result){
                  this.isDialogOpInProgress = false;
                  this.loadAll();
                  this.showMessage({ severity: 'success', summary: 'Rapport modifié avec succès' });
                }

              });

          }

          /** Permet d'afficher un modal pour voir les détails */
          openModalDetail(rapport:IRapport): void {
            this.dialogService.open(DetailsRapportComponent,
              {
                header: 'Details du Rapport',
                width: '60%',
                contentStyle: { overflow: 'auto' },
                baseZIndex: 10000,
                maximizable: true,
                data: rapport
              });
          }
        //Modifier ce modal quand le back vas terminer afin de respecter la logique du certifier

          openModalCertifier(rapport:IRapport): void {
            this.dialogService.open(CertifierRapportComponent,
              {
                header: 'Certifier un Rapport',
                width: '60%',
                contentStyle: { overflow: 'auto' },
                baseZIndex: 10000,
                maximizable: true,
                data: rapport
              });
          }

          // Suppression
          onDelete(rapport: IRapport) {
            this.confirmationService.confirm({
              message: 'Etes-vous sur de vouloir supprimer cette Rapport?',
              accept: () => {
                this.delete(rapport);
              }
            });
          }

          delete(selection: any) {
            this.isOpInProgress = true;
            this.rapportService.delete(selection.id).subscribe(() => {
              this.rapports = this.rapports.filter(rapport => rapport.id !== selection.id);
              selection = null;
              this.isOpInProgress = false;
              this.totalRecords--;
              this.showMessage({
                severity: 'success',
                summary: 'RApport supprimée avec succès',
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
