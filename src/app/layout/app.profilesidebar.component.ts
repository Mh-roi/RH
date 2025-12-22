import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../shared/service/auth.service';

import { IUser, User } from '../shared/model/user';

import { Router } from '@angular/router';

import { TokenStorageService } from '../shared/service/token-storage.service';


@Component({
    selector: 'app-profilemenu',
    templateUrl: './app.profilesidebar.component.html'
})
export class AppProfileSidebarComponent {

    user: IUser = new User();
    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private authService: AuthService,
        private tokenStorageService: TokenStorageService
        ) {
            this.findUser();
         }

    get visible(): boolean {
        return this.layoutService.state.profileSidebarVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.profileSidebarVisible = _val;
    }

    findUser():void {
        // this.authService.findInfosUser().subscribe(
        //     {
        //         next: (response) => {
        //             if(response){
        //                 this.user = response.body!;
        //             }
        //         },
        //     });
    }

    logout(): void {
        this.router.navigate(['/']);
        this.tokenStorageService.signOut();

    }

    infos(): void {
        this.router.navigate(['/admin/account/infos-user']);
    }
}