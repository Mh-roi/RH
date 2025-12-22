export interface IRapport {
  id?: number;
  typerapport?: string;
  periode?: string;
  mesurePrises?: string;
  difficulte?: string;
  recommendations?: string;
  conclusion?: string;
}

export class Rapport implements IRapport {
  constructor(
    public id?: number,
    public typerapport?: string,
    public periode?: string,
    public mesurePrises?: string,
    public difficulte?: string, // ⚡ changé pour correspondre à l'interface
    public recommendations?: string,
    public conclusion?: string
  ) {}
}
