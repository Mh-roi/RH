import { inject, Injectable, signal, Signal } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable()
export class LoginService{

    private api = inject(ApiService);
    private isLogged = signal<boolean>(false);


    login(){
        this.isLogged.set(true);

        return this.isLogged();
    }

    isLoggedIn(): boolean{
        return this.isLogged();
    }

    logout(){
        this.isLogged.set(false);
    }

    generateNewPassword(){

    }

}