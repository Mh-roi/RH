
export interface IPeriode {
    id?: number;
    dateDebut?: string;
    dateFin?: string;
    periodType?:string;
    ministere?:IPeriode;

}
export class Periode implements IPeriode {
    constructor(
        public id?: number, 
        public dateDebut?: string,
        public dateFin?: string,
        public periodType?:string,
        public ministere?:IPeriode
       
    ){}
}