import { Fiche } from './fiche';

export interface IReclamation {
    id?: number;
    sujet?: string;
    statutReclamation?: string;
    decision?: string;
    pieceJustificative?: string;
    ficheDTO?: Fiche;
}
export class Reclamation implements IReclamation {
    constructor(
        public id?: number,
        public sujet?: string,
        public statutReclamation?: string,
        public decision?: string,
        public pieceJustificative?: string,
        // public fiche?: FicheDTO
        public ficheDTO?: Fiche
    ) {}
}
export enum StatutReclamation {
    INITIE = 'Initié',
    EN_COURS = 'En cours',
    TRAITE = 'Traité',
    CLOTURE = 'Clôturé',
}

export enum Decision {
    FAVORABLE = 'Favorable',
    DEFAVORABLE = 'Défavorable',
    EN_ATTENTE = 'En attente',
}
