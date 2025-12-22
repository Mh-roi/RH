import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { IPrivilege, Privilege } from 'src/app/shared/model/privilege';
import { DetailsPrivilegeComponent } from './details-privilege/details-privilege.component';
import { PrivilegeService } from 'src/app/shared/service/privilege.service';
import { CURRENT_PAGE, MAX_SIZE_PAGE } from 'src/app/shared/constants/pagination.constants';

@Component({
  selector: 'app-privilege',
  templateUrl: './privilege.component.html',
  styleUrls: ['./privilege.component.scss']
})
export class PrivilegeComponent implements OnInit, OnDestroy {

  routeData: Subscription | undefined;
  privilegeListSubscription: Subscription | undefined;
  privileges: IPrivilege[] = [];
  privilege: IPrivilege = new Privilege();

  @ViewChild('dtf') form!: NgForm;

  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  enableCreate = false;
  enableBtnInfo = false;
  enableBtnEdit = false;
  enableBtnDelete = false;
  enableBtnClose = false;
  page = CURRENT_PAGE;
  previousPage?: number;
  maxSize = MAX_SIZE_PAGE;
  predicate!: string;
  ascending!: boolean;
  reverse: any;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  message: any;
  dialogErrorMessage: any;

  filtreLibelle: string | undefined;


  constructor(
    private activatedRoute: ActivatedRoute,
    private privilegeService: PrivilegeService,
    private dialogService: DialogService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      () => {
        this.loadAll();
      }
    );
  }

  filtrer(): void {
    this.loadAll();
  }

  resetFilter(): void {
    this.filtreLibelle = undefined;
    this.filtrer();
  }

  ngOnDestroy(): void {
    if (this.routeData) {
      this.routeData.unsubscribe();
      if (this.privilegeListSubscription) {
        this.privilegeListSubscription.unsubscribe();
      }
    }
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
 /** Permet d'afficher le tableau avec tout les elements */
  loadAll(): void {
    const req = this.buildReq();
    this.privilegeService.query(req).subscribe(result => {
      if (result && result.body) {
        this.totalRecords = Number(result.headers.get('X-Total-Count'));
        this.privileges = result.body || [];
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

  /** Permet d'afficher un modal pour voir les détails */
  openModalDetail(exemple: IPrivilege): void {
    this.dialogService.open(DetailsPrivilegeComponent,
      {
        header: 'Details de privilege',
        width: '60%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: exemple
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
