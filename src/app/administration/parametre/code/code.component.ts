import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CURRENT_PAGE, MAX_SIZE_PAGE } from 'src/app/shared/constants/pagination.constants';
import { Fonctionnaire, IFonctionnaire } from 'src/app/shared/model/fonctionnaire';
import { FonctionnaireService } from 'src/app/shared/service/fonctionnaire.service';
import { environment } from 'src/environments/environment';
import { CreerModifierFonctionnaireComponent } from '../fonctionnaire/creer-modifier-fonctionnaire/creer-modifier-fonctionnaire.component';
import { DetailFonctionnaireComponent } from '../fonctionnaire/detail-fonctionnaire/detail-fonctionnaire.component';
import { HttpErrorResponse } from '@angular/common/http';
import { GenererCodeComponent } from './generer-code/generer-code.component';
import { ChangerCodeComponent } from './changer-code/changer-code.component';
import { AfficherCodeComponent } from './afficher-code/afficher-code.component';


@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent {

  
  routeData: Subscription | undefined;
  fonctionnaireListSubscription: Subscription | undefined;
  fonctionnaires: IFonctionnaire[] = [];
  fonctionnaire: IFonctionnaire = new Fonctionnaire();
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
  saveSuccess: boolean = false;
  codePresent: boolean = false;
  code: boolean = false;
  message1: any;
  superieur!: Fonctionnaire;
  newCodeAffiliation!: string;
  oldCodeAffiliation!: string;
  motif!: string;
  reference!: string;
  submitted!: boolean;
  showEnregistrerButton: boolean = false;

  constructor(
    private fonctionnaireService: FonctionnaireService,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private dialogRef: DynamicDialogRef,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
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
          if (this.fonctionnaireListSubscription) {
            this.fonctionnaireListSubscription.unsubscribe();
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

    
      afficherMonCode(){
        this.fonctionnaireService.afficherCodeAffiliation().subscribe(
          data => {
            this.fonctionnaire = data;
            this.message = 'Le code a ete recupere avec succes ';
            if(this.fonctionnaire.codeGenere == null){
              this.code = false;
              this.message = 'Vous n\'avez pas encore généré un code.\nPour générer un code allez à l\'onglet \"Générer code\" !';
            } else { this.code = true}
            this.saveSuccess = true;
                 },
          err => {
            this.message = err.message;
            this.saveSuccess = false;
          }
        );
      }

      genererCodeAffiliation(){
        if(!this.fonctionnaire.codeGenere){
          this.fonctionnaireService.genererCodeAffiliation().subscribe(
            data => {
              this.fonctionnaire = data;
              this.message = 'Le code a été généré avec succès, veuillez le communiquer a vos agents !';
              this.saveSuccess = true;
                   },
            err => {
              this.message = err.message;
              this.saveSuccess = false;
            }
          );
        } else {
          this.codePresent = true;
          this.message = 'Vous avez déjà généré un code d\'affiliation. Allez à l\'onglet \"Mon Code\" pour voir votre code ! ';
        }
        
      }
    
      changerCodeAffiliation(){
          this.fonctionnaireService.genererCodeAffiliation().subscribe(
            data => {
              this.fonctionnaire = data;
              this.message = 'Vous avez changé de code avec succès. Veuillez communiquer le nouveau code à vos agents !';
              this.saveSuccess = true;
              this.showDialog = false
                   },
            err => {
              this.message1 = err.message;
              this.saveSuccess = false;
            }
          );
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
        this.fonctionnaireService.query(req).subscribe(result => {
          if (result && result.body) {
            this.totalRecords = Number(result.headers.get('X-Total-Count'));
            this.fonctionnaires = result.body || [];
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
        this.dialogService.open(CreerModifierFonctionnaireComponent,
          {
            header: 'Ajouter une fonctionnaire',
            width: '60%',
            contentStyle: { overflow: 'auto', },
            baseZIndex: 10000,
            maximizable: true,
            closable: true,
          }
        ).onClose.subscribe(result => {
          if(result) {
          this.fonctionnaires.push(result.body);
          this.isDialogOpInProgress = false;
          this.showMessage({ severity: 'success', summary: 'fonctionnaire creer avec succès' });
          }
        });
      }

      /** Permet d'afficher un modal pour la modification */
      openModalEdit(fonctionnaire: IFonctionnaire): void {
        this.dialogService.open(CreerModifierFonctionnaireComponent,
          {
            header: 'Modifier un fonctionnaire',
            width: '60%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            closable: true,
            data: fonctionnaire
          }).onClose.subscribe(result => {
            if(result){
              this.isDialogOpInProgress = false;
              this.loadAll();
              this.showMessage({ severity: 'success', summary: 'fonctionnaire modifié avec succès' });
            }
           
          });

      }

      /** Permet d'afficher un modal pour voir les détails */
      openModalDetail(fonctionnaire:IFonctionnaire): void {
        this.dialogService.open(DetailFonctionnaireComponent,
          {
            header: 'Details de fonctionnaire',
            width: '60%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            data: fonctionnaire
          });
      }


      // Suppression
      onDelete(fonctionnaire: IFonctionnaire) {
        this.confirmationService.confirm({
          message: 'Etes-vous sur de vouloir supprimer ce fonctionnaire?',
          accept: () => {
            this.delete(fonctionnaire);
          }
        });
      }

      delete(selection: any) {
        this.isOpInProgress = true;
        this.fonctionnaireService.delete(selection.id).subscribe(() => {
          this.fonctionnaires = this.fonctionnaires.filter(fonctionnaire => fonctionnaire.id !== selection.id);
          selection = null;
          this.isOpInProgress = false;
          this.totalRecords--;
          this.showMessage({
            severity: 'success',
            summary: 'fonctionnaire supprimé avec succès',
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

      verifier(){
        if(!this.reference || !this.motif || !this.oldCodeAffiliation || !this.newCodeAffiliation){
          this.messageService.add(
            {severity:'error', summary: 'Erreur', detail: 'Tous les champs sont obligatoires !!! ', life: 5000}
            );
        } else{
        this.fonctionnaireService.VerifierAffiliation(this.newCodeAffiliation).subscribe(
          data => {this.superieur=data},
          err => {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Code incorrect, vérifiez le nouveau code que vous avez saisi !!!', life: 5000 });
          }
        );
      }
    }

    openAfficherCodeDialog() {
      this.dialogService.open(AfficherCodeComponent, {
        header: 'Code d\'affiliation',
        width: '70%',
      });
    }
  
    
    openGenererCodeDialog() {
      this.dialogService.open(GenererCodeComponent, {
        header: 'Code d\'affiliation généré',
        width: '70%',
      });
    }
  
    openChangerCodeDialog() {
      this.dialogService.open(GenererCodeComponent, {
        header: '',
        width: '70%',
      });
    }
  
    openChangerSuperieurDialog() {
      // Handle the superior hierarchique change dialog opening here
      // Use the DialogService to open the corresponding component's dialog
    }
      showSuccess() {
        this.messageService.add({severity:'success', summary: 'Succès', detail: 'Vous avez changé de supérieur hiérarchique avec succès !!! ', life: 5000});
    }
    
    showError() {
      this.messageService.add(
        {severity:'error', summary: 'Erreur', detail: 'Echec du changement de supérieur, vérifiez votre code supérieur !!! ', life: 5000}
        );
    }

    reloadPage(){
      setTimeout(()=>{
        location.reload();
      }, 400);
    }
    save(){
      this.submitted = true;
      if(!this.reference || !this.motif || !this.oldCodeAffiliation || !this.newCodeAffiliation){
        this.messageService.add(
          {severity:'error', summary: 'Erreur', detail: 'Tous les champs sont obligatoires !!! ', life: 5000}
          );
      } else{
      this.fonctionnaireService.changerAffiliation(this.oldCodeAffiliation, this.newCodeAffiliation, 
        this.reference, this.motif).subscribe(
        data => {
          this.saveSuccess = true;
          this.showSuccess();
          this.reloadPage();
        },
        err => {
          this.message = err.message;
          this.saveSuccess = false;
          this.showError();
          this.reloadPage();
        }
      )
    }   
  }
}
