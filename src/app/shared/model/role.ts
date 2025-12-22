export interface IRole {
    id?: number;
    code?: string;
    libelle?: string;
}

export class Role implements IRole{
    constructor(
        public code?: string,
        public libelle?: string,
        public id?: number,
        
    ) {}
}
