export interface IFonction {
    id?: number;
    code?: string;
    libelle?: string;
    rang?: string;
    sigle?: string
}

export class Fonction implements IFonction {
    constructor(
        public id?: number,
        public code?: string,
        public libelle?: string,
        public  rang?: string,
        public sigle?: string
    ){}
}