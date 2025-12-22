export interface IFPParameter{
    id?: number;
    code?: string;
    key?: string;
    value?: string;
    description?: string;
    parent?: string;
}

export class FPParameter implements IFPParameter{
    constructor(
        public id?: number, 
        public code?: string, 
        public key?: string,
        public description?: string,
        public parent?: string){}
}