import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Compte } from "../models/compte.model";

@Injectable()
export class CompteService{

    private httpClient = inject(HttpClient);

    getAll(){

    }

    getActive(){

    }

    getInactive(){

    }

    getById(id: number){

    }

    getByUsername(username: string){

    }

    create(compte: Compte){

    }

    update(id: number, compte: Compte){

    }

    delete(id: number){

    }
}