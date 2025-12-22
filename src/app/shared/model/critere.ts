import { ProfilAgent } from "./profil-agent";


export interface ICritere {
    id?:number;
    libelle?:string;
    ponderation?:number;
    typeAgent?:ProfilAgent;
    statut?:boolean;
}

export class Critere implements ICritere{
    constructor(
        public id?: number, 
        public libelle?: string,
        public ponderation?: number,
        public statut ?:boolean
       
    ){}
}


