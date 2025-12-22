import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePasswordDTO, IChangePasswordDTO } from 'src/app/shared/model/change-password-dto';
import { IUser, User } from 'src/app/shared/model/user';
import { AuthService } from 'src/app/shared/service/auth.service';
import { UserService } from 'src/app/shared/service/user.service';
import { ModifierUserComponent } from './modifier-user/modifier-user.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-infos-user',
  templateUrl: './infos-user.component.html',
  styleUrls: ['./infos-user.component.scss']
})
export class InfosUserComponent {

  user: IUser = new User();
  oldPassword: string | undefined;
  newPassword: string | undefined;
  confirmPassword: string | undefined;
  enableBtnEdit = true;
  enableBtnInfo = true;

  changePasswordDTO: IChangePasswordDTO = new ChangePasswordDTO();
  
  today = new Date();

  isChangeInfoPerso = false;

  strongPassword = false;

  newMail: string | undefined;

  isTypePassword = true; // true :'password', false: text;

  @ViewChild('passwordForm') public validePasswordForm!: NgForm;
  isDialogOpInProgress: boolean | undefined;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dialogService: DialogService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // this.authService.findInfosUser().subscribe(account => {
    //   if (account) {
    //     this.user = account.body!;
    //   }
    // });
  }

  changePassword(): void {
    // if (this.newPassword !== this.confirmPassword) {
          this.changePasswordDTO.oldPassword;
          this.changePasswordDTO.newPassword = this.newPassword;
          console.log(this.changePasswordDTO);
          this.userService.changePassword(this.changePasswordDTO).subscribe(
            () => { 
               // this.authService.logout();
                });

            
                  this.emptyFields();
  }

  emptyFields(): void {
    this.newMail = undefined;
    this.oldPassword = undefined;
    this.newPassword = undefined;
    this.confirmPassword = undefined;
  }

  onPasswordStrengthChanged(event: boolean) {
    this.strongPassword = event;
  }

  checkIdentiquePassword(): void {
    if (
      this.newPassword != this.confirmPassword &&
      !this.validePasswordForm.controls['confirmPassword']?.errors?.['pattern'] &&
      !this.validePasswordForm.controls['confirmPassword']?.errors?.['required']
    ) {
      this.validePasswordForm.controls['confirmPassword'].setErrors({ nomatch: true });
    }
  }

  togglePassword(): void {
    this.isTypePassword = !this.isTypePassword;
  }

  /** Permet d'afficher un modal pour la modification */
  openModalEdit(user: IUser): void {
    this.dialogService.open(ModifierUserComponent,
      {
        header: 'Modifier votre compte',
        width: '60%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        closable: true,
        data: user
      }).onClose.subscribe((result: any) => {
        if(result){
          this.isDialogOpInProgress = false;
          this.loadAll();
          this.showMessage({ severity: 'success', summary: 'compte modifié avec succès' });
        }
       
      });

  }
  loadAll() {
    throw new Error('Method not implemented.');
  }
  showMessage(arg0: { severity: string; summary: string; }) {
    throw new Error('Method not implemented.');
  }

}
