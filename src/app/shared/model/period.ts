import { Ministere } from "./ministere";

export interface IPeriode {
    id?: number;
    dateDebut?: string;
    dateFin?: string;
    periodType?:string;
    ministereInstitution?:Ministere;

}

export class Periode implements IPeriode{
    constructor(
        public id?: number,
        public dateDebut?: string,
        public dateFin?: string,
        public periodType?:string,
        public ministereInstitution?:Ministere,

    ){}
}
