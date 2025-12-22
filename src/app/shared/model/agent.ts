import { Ministere } from './ministere';
import { IFonction } from './fonction';
import { IProfilAgent } from './profil-agent';
import { Note } from './note';
import { IEmploi } from './emploi';
import { IStructure } from './structure';

export interface IAgent {
    id?: number | null;
    nom?: string;
    prenom?: string;
    telephone?: string;
    adresse?: string;
    echelon?: string;
    echelle?: string;
    classe?: string;
    categorie?: string;
    resetKey?: string;
    resetDate?: Date;
    ministereInstitution?: Ministere;
    fonction?: IFonction;
    sexe?: string;
    sousPosition?: string;
    uniteAdministrative?: string;
    codeAffiliation?: string;
    codeGenere?: string;
    password?: string;
    profil?: IFonction;
    emploi?: IEmploi;
    matricule?: string;
    email?: string;
    actif?: boolean;
    isPointed?: Boolean;
    profil_agent?: IProfilAgent;
    structure?: IStructure;
    superieurHierarchique?: IAgent;
}

export class Agent implements IAgent {
    constructor(
        public id?: number | null,
        public nom?: string,
        public prenom?: string,
        public telephone?: string,
        public adresse?: string,
        public echelon?: string,
        public echelle?: string,
        public classe?: string,
        public categorie?: string,
        public profil_agent?: IProfilAgent,
        public resetKey?: string,
        public resetDate?: Date,
        public ministereInstitution?: Ministere,
        public fonction?: IFonction,
        public sexe?: string,
        public sousPosition?: string,
        public uniteAdministrative?: string,
        public codeAffiliation?: string,
        public codeGenere?: string,
        public password?: string,
        public profil?: IFonction,
        public matricule?: string,
        public email?: string,
        public actif?: boolean,
        public isPointed?: Boolean,
        public emploi?: IEmploi,
        public structure?: IStructure,
        public superieurHierarchique?: IAgent
    ) {}
}
