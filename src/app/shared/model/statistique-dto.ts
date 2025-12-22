export interface IStatistiqueDTO {
    indicator?:string;
    label?:string;
    value?:number;
}
export class StatistiqueDTO implements IStatistiqueDTO {
    constructor(
        public indicator?:string, 
        public label?:string, 
        public value?:number
    ){}
}
