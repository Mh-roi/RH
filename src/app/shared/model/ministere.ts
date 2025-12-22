
export interface IMinistere{
    id?: number;
    libelle?: string;
    code?: string;
    sigle?: string;
      mission?: string;
    effectif?: string;
    organisation?: string;
    description?:string


}


export class Ministere implements IMinistere{
    constructor(
        public id?: number,
        public libelle?: string,
        public code?: string,
        public sigle?: string,
      public  mission?: string,
          public effectif?: string,
        public  organisation?: string,

 public  description?: string
    ){}
}
