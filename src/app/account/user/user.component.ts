import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { IUser, User } from 'src/app/shared/model/user';
import { UserService } from 'src/app/shared/service/user.service';
import { CreerModifierUserComponent } from './creer-modifier-user/creer-modifier-user.component';
import { DetailUserComponent } from './detail-user/detail-user.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  routeData: Subscription | undefined;
  userListSubscription: Subscription | undefined;
  users: IUser[] = [];
  user: IUser = new User();

  @ViewChild('dtf') form!: NgForm;

  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  enableCreate = true;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete = true;
  enableBtnClose = true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  message: any;
  dialogErrorMessage: any;

  filtreLibelle: string | undefined;


  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
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
      if (this.userListSubscription) {
        this.userListSubscription.unsubscribe();
      }
    }
  }

  /** Permet d'afficher le tableau avec tout les elements */
  loadAll(event?: LazyLoadEvent): void {
    this.isLoading = true;
    this.userService.findAll(event).subscribe(
      {
        next: (result) => {
          if (result && result.body) {
            this.isLoading = false;
            this.users = result.body!;
            console.log("liste user", this.users);
          }
        },
        error: (reason) => {
          this.message = { severity: 'error', summary: reason.error };
          console.error(JSON.stringify(reason));
        }
      });
  }


  /** Permet d'afficher un modal pour l'ajout */
  openModalCreate(): void {
    this.dialogService.open(CreerModifierUserComponent,
      {
        header: 'Ajouter un utilisateur',
        width: '70%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        closable: true,
      }
    ).onClose.subscribe(result => {
      if (result) {
        this.users.push(result.body);
        this.showMessage({
          severity: 'success',
          summary: 'Utilisateur creer avec succès',
        });
      }
    });

  }

  /** Permet d'afficher un modal pour la modification */
  openModalEdit(user: IUser): void {
    this.dialogService.open(CreerModifierUserComponent,
      {
        header: 'Utilisateur un taux de cotisation',
        width: '60%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        closable: true,
        data: user
      }).onClose.subscribe(result => {
        if (result) {
          this.loadAll();
          this.showMessage({
            severity: 'success',
            summary: 'Modifier avec succès',
          });
        }
      });

  }

  /** Permet d'afficher un modal pour voir les détails */
  openModalDetail(user: IUser): void {
    this.dialogService.open(DetailUserComponent,
      {
        header: 'Details du taux de cotisation',
        width: '60%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: user
      });
  }



  // Deletion
  onDelete(exemple: IUser) {
    this.confirmationService.confirm({
      message: 'Etes-vous sur de vouloir supprimer ce taux de cotisation?',
      accept: () => {
        this.delete(exemple);
      }
    });
  }

  delete(selection: any) {
    this.isOpInProgress = true;
    this.userService.delete(selection.id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({
        severity: 'success',
        summary: 'Exemple supprimé avec succès',
      });
    }, (error) => {
      console.error("Exemple " + JSON.stringify(error));
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
