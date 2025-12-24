import { Domaine } from "./domaine";

export interface IObjectif {
    id?:number;
    code?: string;
    libelle?:string;
    domaine?: Domaine
    domaineId?: number; // Ajouter ce champ
    
}

export class Objectif implements IObjectif{
    constructor(
        public id?: number, 
        public code?: string,
        public libelle?: string,
        public domaine?: Domaine,
        public  domaineId?: number // Ajouter ce champ

    ){}
}

