import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { AuthService } from 'src/app/shared/service/auth.service';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';
import { UserService } from 'src/app/shared/service/user.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ILoginVM, LoginVM } from 'src/app/shared/model/login-vm';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [MessageService],
})
export class LoginComponent implements OnInit, OnDestroy {
    @ViewChild('dtf') form!: NgForm;

    account: ILoginVM = new LoginVM();
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    timeoutHandle: any;

    constructor(
        private layoutService: LayoutService,
        private authService: AuthService,
        private tokenStorage: TokenStorageService,
        private userService: UserService,
        private router: Router,
        private messageService: MessageService
    ) {}

    get dark(): boolean {
        return this.layoutService.config.colorScheme !== 'light';
    }

    ngOnInit(): void {}

    ngOnDestroy(): void {
        clearTimeout(this.timeoutHandle);
    }

    /**
     * Connexion utilisateur
     */
     /* seConnecter(): void {
        if (!this.account.matricule || !this.account.password) return;

        this.authService.login(this.account).subscribe({
            next: (data) => {
                if (data?.access_token && data?.matricule) {
                    this.tokenStorage.saveToken(data.access_token);

                    this.authService.getConnectedUser().subscribe({
                        next: (user) => {
                            this.tokenStorage.saveUser(user);
                            this.isLoggedIn = true;
                            this.isLoginFailed = false;

                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: `Bienvenue ${user.nom} !`,
                            });

                            this.setRoute(user.profil?.name);
                        },
                        error: () => {
                            this.errorMessage =
                                "Impossible de récupérer l'utilisateur.";
                            this.isLoginFailed = true;
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Erreur',
                                detail: this.errorMessage,
                            });
                        },
                    });
                } else {
                    this.handleLoginError('Identifiants invalides.');
                }
            },
            error: () => {
                this.handleLoginError(
                    'Matricule ou mot de passe incorrect. Ou compte désactivé.'
                );
            },
        });
    } */ 
/* 
         seConnecter(): void {
              // Profil par défaut
    localStorage.setItem('profil', 'Administrateur');
    this.router.navigate(['/admin']);
} 


  


    private handleLoginError(msg: string): void {
        this.errorMessage = msg;
        this.isLoginFailed = true;
        this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: msg,
        });

        this.timeoutHandle = setTimeout(() => {
            this.isLoginFailed = false;
            this.errorMessage = '';
        }, 5000);
    }

    /**
     * Redirection selon rôle
     */

          seConnecter(): void {
              // Profil par défaut
    localStorage.setItem('profil', 'Administrateur');
    this.router.navigate(['/admin']);
}


    setRoute(profil: string): void {
        localStorage.setItem('profil', profil);
        switch (profil) {
            case 'Administrateur':
                this.router.navigate(['/admin']);
                break;
            case 'Supérieur hiérarchique immédiat':
                this.router.navigate(['/superieur']);
                break;
            case 'DRH':
                this.router.navigate(['/drh']);
                break;
            case 'SPMABG':
                this.router.navigate(['/drh']);
                break;
            case 'AGENT':
                this.router.navigate(['/agent']);
                break;
            default:
                this.router.navigate(['/dashboard']);
                break;
        }
    }
}
