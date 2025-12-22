export interface IEmploi {
    id?: number;
    code?: string;
    libelle?: string;
    sigle?: string;
    categorie?: string;
}

export class Emploi implements IEmploi {
    constructor(
        public id?: number,
        public code?: string,
        public libelle?: string,
        public categorie?: string
    ){}
}