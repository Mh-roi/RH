export interface IDomaine {
    id?:number;
    code?: string;
    libelle?:string
    
}

export class Domaine implements IDomaine{
    constructor(
        public id?: number, 
        public code?: string,
        public libelle?: string
    ){}
}

