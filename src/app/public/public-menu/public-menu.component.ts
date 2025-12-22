import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { RouterPathService } from 'src/app/shared/service/router-path.service';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';

@Component({
    selector: 'app-public-menu',
    templateUrl: './public-menu.component.html',
    styleUrls: ['./public-menu.component.scss'],
})
export class PublicMenuComponent implements OnDestroy, OnInit {
    items: MenuItem[] = [];

    subscription: Subscription;

    darkMode: boolean = false;
    hidden: boolean = false;

    isLoggedIn = false;
    matricule?: string;
    monespace?: string;

    constructor(
        public router: Router,
        private layoutService: LayoutService,
        private routePathService: RouterPathService,
        private tokenStorageService: TokenStorageService
    ) {
        this.subscription = this.layoutService.configUpdate$.subscribe(
            (config) => {
                this.darkMode =
                    config.colorScheme === 'dark' ||
                    config.colorScheme === 'dim'
                        ? true
                        : false;
            }
        );
    }

    ngOnInit() {
        this.items = [
            {
                label: 'Accueil',
                icon: 'pi pi-home',
                routerLink: ['/'],
                routerLinkActiveOptions: {
                    exact: true,
                },
            },
            {
                label: 'Manuel utilisateur',
                icon: 'pi pi-book',
                command: () => this.download(),
            },
            {
                label: 'Création de compte',
                icon: 'pi pi-user-plus',
                routerLink: ['/creation-compte'],
            },
            {
                label: 'FAQ',
                icon: 'pi pi-folder-open',
                routerLink: ['/apropos'],
            },
        ];
    }

    showHideMenu() {
        console.log(this.hidden);
        if (this.hidden) this.hidden = false;
        else this.hidden = true;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    download() {
        // window.open(
        //     environment.domaine +
        //         '/assets/download/Guide utilisateur eNotation.pdf',
        //     '_blank'
        // );
    }
    moveToAPath(path: String): void {
        this.routePathService.updatePath(path);
    }

    login() {
        this.router.navigate(['auth/login']);
    }

    logout(): void {
        this.tokenStorageService.signOut();
        this.router.navigate(['/']);
        window.location.reload();
    }

    setRoute(profil: string) {
        switch (profil) {
            case 'ROLE_ADMIN':
                this.router.navigate(['/admin']);
                break;
            case 'ROLE_AG':
                this.router.navigate(['/agent']);
                break;
            case 'ROLE_DRH':
                this.router.navigate(['/drh']);
                break;
            default:
                this.router.navigate(['/superieur']);
                break;
        }
    }

    espace() {
        this.setRoute(this.tokenStorageService.getUser().profil);
    }
}
