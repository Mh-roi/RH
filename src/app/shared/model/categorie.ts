
export interface ICategorie{
    id?: number;
    libelle?: string;
    parent?: ICategorie;

}

export class Categorie implements ICategorie{
    constructor(
        public id?: number,
        public libelle?: string,
        public parent?: ICategorie

    ){}
}
