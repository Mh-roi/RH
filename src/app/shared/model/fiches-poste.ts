import { Categorie } from "./categorie";

export interface IFichesPoste {
    id?: number;
    libelle?: string;
    code?: string;
    url?: string;
    categorie?: Categorie;
}

export class FichesPoste implements IFichesPoste{
    constructor(
       public id?: number,
       public    libelle?: string,
       public    code?: string,
       public   url?: string,
       public   categorie?: Categorie
    ){}
}