import { Agent } from "./agent";

// src/app/shared/models/agent-fiche.model.ts
export interface AgentFiche {
    statutControle: string;
    id?: number;
    ficheId: number;
    agentMatricule: string;
  
    mesurePrise?: string;
    referenceMesure?: string;
    periode?: string;
    performance?: string;
    dureeAbsenceJ?: number;
    dureeAbsenceH?: number;
    agent?: Agent; // Jointure côté client

      // ✅ Ajoute ces propriétés utilisées uniquement côté frontend
  isPresent?: boolean;
  isAbsent?: boolean;
  }

  