import { IMinistere } from "./ministere";


export interface IStructure{
    id?: number;
    libelle?: string;
    code?: string;
    sigle?: string;
    matriculeResponsable?:string ;
    niveauStructure?: any;
  parent?: IStructure | null; // <- bien mettre `| null`
    ministere?:IMinistere | null; // <- bien mettre `| null`
    nomResponsable?: string;
    prenomResponsable?: string


}


export class Structure implements IStructure{
    constructor(
    public    id?: number,
    public  libelle?: string,
    public     code?: string,
    public  sigle?: string,
    public  matriculeResponsable?:string ,
    public    niveauStructure?: any,
    public     parent?: IStructure | null ,
    public      ministere?:IMinistere | null,// <- bien mettre `| null`
    public   nomResponsable?: string,
    public     prenomResponsable?: string

    ){}
}
