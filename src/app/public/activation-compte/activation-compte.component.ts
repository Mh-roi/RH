import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { LazyLoadEvent, Message } from 'primeng/api';
import {
    Fonctionnaire,
    IFonctionnaire,
} from 'src/app/shared/model/fonctionnaire';
import { IMinistere, Ministere } from 'src/app/shared/model/ministere';
import { IProfilAgent, ProfilAgent } from 'src/app/shared/model/profil-agent';
import { AuthService } from 'src/app/shared/service/auth.service';
import { FonctionnaireService } from 'src/app/shared/service/fonctionnaire.service';
import { MinistereService } from 'src/app/shared/service/ministere.service';
import { ProfilAgentService } from 'src/app/shared/service/profil-agent.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
    selector: 'app-activation-compte',
    templateUrl: './activation-compte.component.html',
    styleUrls: ['./activation-compte.component.scss'],
})
export class ActivationCompteComponent {
    isSuccessful = false;
    isSendUpFailed = false;
    dialogErrorMessage!: string;
    message!: Message;
    form: any = {
        emailAddress: null,
    };

    constructor(
        private authService: AuthService,
        private userService: UserService
    ) {}

    ngOnInit(): void {}

    onSubmit(): void {
        const emailAddress = this.form.emailAddress;
        console.log('Email Address ====>', emailAddress);
        this.userService.getUserByMatricule1(this.form.matricule).subscribe(
            (response) => {
                console.log('Response ====>', response);
                this.isSuccessful = true;
                this.isSendUpFailed = false;
                this.message = {
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Un email vous a été envoyé pour réinitialiser votre mot de passe.',
                };
            },
            (err: HttpErrorResponse) => {
                this.isSuccessful = false;
                this.isSendUpFailed = true;
                this.handleError(err);
                this.message = {
                    severity: 'error',
                    summary: 'Erreur',
                    detail: this.dialogErrorMessage,
                };
            }
        );
    }

    handleError(err: HttpErrorResponse) {
        console.error(`Processing Error: ${JSON.stringify(err)}`);
        this.dialogErrorMessage = err.error.message;
    }
}
