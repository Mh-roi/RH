export interface IPrivilege {
    id?: number;
    code?: string;
    libelle?: string;
    isChecked?: boolean;
}

export class Privilege implements IPrivilege {

    constructor(
        public id?: number, 
        public code?: string,
        public libelle?: string,
        public isChecked?: boolean,
       ){}
}