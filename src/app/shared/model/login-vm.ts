export interface ILoginVM {
    matricule?:string;
    password?:string;
    rememberMe?:boolean;
}

export class LoginVM implements ILoginVM {

    constructor(
        public matricule?:string, 
        public password?:string,
        public rememberMe?:boolean,
        ) {}


        
}

export interface AuthenticationResponse {
    access_token: string;
    matricule: string; // À adapter selon ce que le backend retourne exactement
  }
  