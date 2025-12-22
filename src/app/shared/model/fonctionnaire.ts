import { Ministere } from './ministere';
import { IFonction } from './fonction';
import { IProfilAgent } from './profil-agent';
import { Note } from './note';
import { Structure } from './structure';
import { Agent } from './agent';
import { IEmploi } from './emploi';

export interface IFonctionnaire {
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
    emailAddress?: string;
    actif?: boolean;
    profil_agent?: IProfilAgent;
}

export class Fonctionnaire implements IFonctionnaire {
    constructor(
        public id?: number | null,
        public nom?: string,
        public nomJF?: string,
        public prenom?: string,
        public telephone?: string,
        public dateNaissance?: string,
        public lieuNaissance?: string,
        public dateRecrutement?: string,
        public adresse?: string,
        public email?: string,
        public noCNIB?: string,
        public nip?: string,
        public position?: string,
        public echelon?: string,
        public echelle?: string,
        public classe?: string,
        public categorie?: string,
        public profil_agent?: IProfilAgent,
        public resetKey?: string,
        public resetDate?: Date,
        public ministereInstitution?: Ministere,
        public structure?: Structure,
        public superieurHierarchique?: Agent,
        public fonction?: IFonction,
        public sexe?: string,
        public sousPosition?: string,
        public uniteAdministrative?: string,
        public codeAffiliation?: string,
        public codeGenere?: string,
        public password?: string,
        public profil?: IFonction,
        public matricule?: string,
        public emailAddress?: string,
        public actif?: boolean,
        public emploi?: IEmploi
    ) {}
}

export interface IFoncNote {
    note?: Note;
    fonctionnaire?: Fonctionnaire;
}

export class FoncNote implements IFoncNote {
    constructor(public note?: Note, public fonctionnaire?: Fonctionnaire) {}
}

export interface IFct {
    id?: number | null;
    matricule?: string;
    nom?: string;
    prenom?: string;
    profil?: IFonction;
}

export class Fct implements IFct {
    constructor(
        public id?: number | null,
        public matricule?: string,
        public nom?: string,
        public prenom?: string,
        public profil?: IFonction
    ) {}
}

export class ChangePasswordVo {
    currentPassword?: string;
    newPassword?: string;
}
