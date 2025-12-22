import { Critere } from "./critere"
import { IFct } from "./fonctionnaire";

export interface Note{
    id?:number;
    observation?:string;
    pointDivergeance?:string;
    statusRejete?:boolean;
    propositionSuperieur?:boolean;
    contraintesRealisation?:string;
    noteGlobale?:number;
    annee?:string;
    date_validation?:Date;
    noteActivite?:number;
    okSuperieur?:boolean;
    okAgent?:boolean;
    noteCritereList?: CritereNote[];
    urlRecours?:string;
    tauxActivite?:number;
    fonctionnaire?:IFct;
}

////////////////////////////////////////////////////////////////////////////////////////////////
export class Notation implements Note{
    constructor(
        public   id?:number,
        public  observation?:string,
        public   pointDivergeance?:string,
        public   statusRejete?:boolean,
        public   propositionSuperieur?:boolean,
        public   contraintesRealisation?:string,
        public  noteGlobale?:number,
        public  annee?:string,
        public  date_validation?:Date,
        public  noteActivite?:number,
        public  okSuperieur?:boolean,
        public  okAgent?:boolean,
        public  noteCritereList?: CritereNote[],
        public  urlRecours?:string,
        public  tauxActivite?:number,
        public  fonctionnaire?:IFct
    ){}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface CritereNote{
    id?:number;
    note?:number;
    id_note?:Note;
    critere?:Critere;
    ponderation?:string;
   }

   export interface NoteParCritere{
    id?:number;
    note?:number;
    libelleCritere?: string;
   }

export interface NoteSuperieur{
    id?:number;
    annee?: string;
    idFonctionnaire?: number;
    contraintesRealisation?: string;
    pointDivergeance?: string;
    observation?: string;
    tauxActivite?: number;
    noteCriteres?: CritereNote[];
}



