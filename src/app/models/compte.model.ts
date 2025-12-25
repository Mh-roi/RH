import { CompteInterface } from "../interfaces/compte.interface";

export class Compte implements CompteInterface{
    id: number;
    username: string;
    password: string;
    profileId: number;
    actif: boolean;

    constructor(id: number, username: string, password: string, profileId: number, actif: boolean){
        this.id = id;
        this.username = username;
        this.password = password;
        this.profileId = profileId;
        this.actif = actif;
    }

    static getEmpty(){ return new Compte(0, '', '', 0, false); }

    //getter and setter methods can be added here if needed
    getId(): number { return this.id; }
    getUsername(): string { return this.username; }
    getPassword(): string { return this.password; }
    getProfileId(): number { return this.profileId; }
    getActif(): boolean { return this.actif; }

    setId(id: number): void { this.id = id; }
    setUsername(username: string): void { this.username = username; }
    setPassword(password: string): void { this.password = password; }
    setProfileId(profileId: number): void { this.profileId = profileId; }
    setActif(actif: boolean): void { this.actif = actif; }

    static fromDb(data: CompteInterface): Compte {
        const compte = Compte.getEmpty();

        compte.setId(data.id);
        compte.setUsername(data.username);
        compte.setPassword(data.password);
        compte.setProfileId(data.profileId);
        compte.setActif(data.actif);

        return compte;
    }

    toDb(): CompteInterface {
        return {
            id: this.getId(),
            username: this.getUsername(),
            password: this.getPassword(),
            profileId: this.getProfileId(),
            actif: this.getActif()
        };
    }

}