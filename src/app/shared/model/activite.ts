import { IFonctionnaire } from "./fonctionnaire";
export interface IActivite {
    id?:number;
    libelle?:string;
    ponderation?:number;
    taux_realisation?:number;
    observation?: string;
    annee?:number;
    fonctionnaire?:IFonctionnaire;
}

export class Activite implements IActivite{
    constructor(
        public id?:number,
        public libelle?:string,
        public ponderation?:number,
        public taux_realisation?:number,
        public observation?: string,
        public annee?:number,
        public fonctionnaire?:IFonctionnaire){}
}
