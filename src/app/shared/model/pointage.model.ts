import { Agent } from './agent';

export interface IPointage {
    id?: number; // optionnel en cas de création

    dateControle: string; // format ISO ex: '2025-05-20'
    heureControle: string; // ex: '08:30'
    statutControle: 'PRESENT' | 'ABSENT' | 'ABSENT_JUSTIFIE';
    lieuControle: string;

    dureeAbsenceJ?: number;
    dureeAbsenceH?: number;
    justification?: string;
    referencePJ?: string;
    pieceJustificative?: string;

    typePointage: number; // ID du type_pointage (ex. 1 pour IOS)
    agentId?: number;
    agentDTO?: Agent;
    hierarchieId?: number;
}

export class Pointage implements IPointage {
    dateControle: string;
    heureControle: string;

    constructor(
        public id?: number,
        dateControle: string = '',
        heureControle: string = '',
        public statutControle:
            | 'PRESENT'
            | 'ABSENT'
            | 'ABSENT_JUSTIFIE' = 'PRESENT',
        public lieuControle: string = '',
        public dureeAbsenceJ?: number,
        public dureeAabsenceH?: number,
        public referencePJ?: string,
        public justification?: string,
        public pieceJustificative?: string,
        public typePointage: number = 1,
        public agentId: number = 0,
        public hierarchieId?: number,
        public agentDTO?: Agent
    ) {
        this.dateControle = dateControle;
        this.heureControle = heureControle;
    }
    dureeAbsenceH?: number | undefined;
    // Méthode pour formater la date au format ISO
    formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    // Méthode pour formater l'heure au format HH:MM
    formatTime(date: Date): string {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    // Méthode pour formater la date et l'heure au format ISO
    formatDateTime(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
}

export interface PointageAgent {
    id?: number;
    date_controle: string;
    heure_controle: string;
    statut_controle: 'present' | 'absent';
    lieu_controle: string;
    justification?: string;
    agent: {
        matricule: string;
        nom: string;
        prenom: string;
        fonction: string;
    };
}
