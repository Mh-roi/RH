export interface Stats {
    indicator?:string;
    label?:string;
    value?:number;
}

export interface AllStats {
    stats: Stats[];
}