export interface IProfilAgent {
    id?: number;
    name?: string;
    libelle?: string;
}

export class ProfilAgent implements IProfilAgent {
    constructor(
        public id?: number,
        public name?: string,
        public libelle?: string
    ) {}
}
