// src/app/shared/models/fiche.model.ts
export enum TypeFiche {
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D'
  }
  
  export enum StatutFiche {
    EDITE = 'Editée',
    PUBLIEE = 'Publiée',
    CERTIFIEE = 'Certifiée',
    ELABOREE = 'Elaborée'
  }
  
  export interface Structure {
    id: number;
    code: string;
    libelle: string;
  }
  
  export interface Fiche {
    id?: number;
    reference: string;
    periode: Date;
    heure: string;
    positionFiche: string;
    typeFiche: TypeFiche;
    statutFiche: StatutFiche;
    publiee: boolean;
    dateElaboration: Date;
    dateCertification?: Date;
    structureGeneratrice?: Structure;
    structure?: Structure;
    heureElaboration?: string;
    heureFin?:string
    
  }