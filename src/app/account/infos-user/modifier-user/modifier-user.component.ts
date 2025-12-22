import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, Message } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CreerModifierCategorieComponent } from 'src/app/administration/parametre/categorie/creer-modifier-categorie/creer-modifier-categorie.component';
import { IUser, User } from 'src/app/shared/model/user';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-modifier-user',
  templateUrl: './modifier-user.component.html',
  styleUrls: ['./modifier-user.component.scss']
})
export class ModifierUserComponent {


  @ViewChild('dtf') form!: NgForm;
  user: IUser = new User();
  @Input() data: IUser = new User();
  // categories: IUser[]=[];
  // parents: IUser[]=[];
  error: string | undefined;
  showDialog = false;
  isDialogOpInProgress!: boolean;
  message: any;
  dialogErrorMessage: any;
  timeoutHandle: any;
  isOpInProgress!: boolean;

  constructor(
    private userService: UserService,
    private dialogRef: DynamicDialogRef,
    private confirmationService: ConfirmationService
  ) { }
  

  clear(): void {
    this.form.resetForm();
    this.dialogRef.close();
    this.dialogRef.destroy();
  }
  isEditing() {
    return !!this.user.id;
  }

  clearDialogMessages() {
    this.dialogErrorMessage = null;
  }
  // Errors
  handleError(error: HttpErrorResponse) {
    console.error(`Processing Error: ${JSON.stringify(error)}`);
    this.isDialogOpInProgress = false;
    this.dialogErrorMessage = error.error.title;
  }

  showMessage(message: Message) {
    this.message = message;
    this.timeoutHandle = setTimeout(() => {
      this.message = null;
    }, 5000);
  }

   /** Permet d'afficher un modal pour la modification */
   updateEntity(): void {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    // console.log("I am here ==================");
    if (this.user) {
      // console.log("User ==================", this.user);
      if (this.user.id) {
        this.userService.updateuser(this.user).subscribe(
          {
            next: (response) => {
              this.dialogRef.close(response);
              this.dialogRef.destroy();
              this.showMessage({ severity: 'success', summary: 'utilisateur modifié avec succès' });
             
            },
            error: (error) => {
              console.error("error" + JSON.stringify(error));
              this.isOpInProgress = false;
              this.showMessage({ severity: 'error', summary: error.error.message });

            }
          });
      } 
      }
    }
  }


