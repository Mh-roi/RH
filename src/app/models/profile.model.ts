export class Profile{
    username: string;
    password: string;

    constructor(usr: string, pwd: string){
        this.username = usr;
        this.password = pwd;
    }
}