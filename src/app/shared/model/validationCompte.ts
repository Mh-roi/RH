export interface IValidationCompte{
    token?: string;
    password?: string;
    confirmePassword?: string;
}
export class ValidationCompte implements IValidationCompte{
    constructor(
        public token?: string,
        public password?: string,
        public confirmePassword?: string
    ){}
}