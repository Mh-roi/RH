import { IEmploi } from './emploi';
import { IFonction } from './fonction';
import { IPrivilege } from './privilege';
import { IProfilAgent } from './profil-agent';
import { IStructure } from './structure';
//import { IProfil } from "./fonction";

export interface IUser {
    id?: number;
    nomUtilisateur?: string;
    /* usermane?: string;
    dateNaissance?: Date;
    photo?: string;*/
    email?: string;
    nom?: string;
    prenom?: string;
    actif?: boolean;
    activationKey?: string;
    resetKey?: string;
    confirmationExpireDate?: Date;
    resetExpireDate?: Date;
    // langKey?: string;
    telephone?: string;
    profile?: IProfilAgent;
    //  privilegeCollection?: IPrivilege[];
    password?: string;
    confirmePassword?: string;
    fonctionId?: number;
    emploiId?: number;
    structureId?: number,
}

export class User implements IUser {
    constructor(
        public id?: number,
        public nomUtilisateur?: string,
        public email?: string,
        public matricule?: string,
        // public photo?: string,
        // public dateNaissance?: Date,
        public nom?: string,
        public prenom?: string,
        public actif?: boolean,
        public activationKey?: string,
        public resetKey?: string,
        public confirmationExpireDate?: Date,
        public resetExpireDate?: Date,
        public telephone?: string,
        public profile?: IProfilAgent,
        // public privilegeCollection?: IPrivilege[],
        public password?: string,
        public confirmePassword?: string,
        public emploiId?: number,
        public structureId?: number,
         public fonctionId?: number,
    ) {}
}
