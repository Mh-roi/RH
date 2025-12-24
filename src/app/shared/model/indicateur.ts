import { Objectif } from "./objectif";

export interface IIndicateur {
    id?: number;
    code?:string;
    libelle?:string;
    seuil?:string;
    norme?:string;
    definition?:string;
    methodeCalcul?:string;
    objectif?:  Objectif;
    objectifId?: number
}

export class Indicateur implements IIndicateur{
    constructor(
       public id?: number,
        public code?: string, 
        public libelle?: string,
        public seuil?: string,
        public norme ?:string,
        public  definition?:string,
        public    methodeCalcul?:string,
        public objectif?:  Objectif,
        public  objectifId?: number
       
    ){}
}

