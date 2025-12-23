import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable()
export class LoginService{

    constructor(private api: ApiService){

    }

    login(){
        return true;
    }

    logout(){

    }

    generateNewPassword(){

    }

}