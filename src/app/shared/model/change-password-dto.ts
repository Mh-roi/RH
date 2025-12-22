export interface IChangePasswordDTO {
    newPassword?: string;
    oldPassword?: string;
}

export class ChangePasswordDTO implements IChangePasswordDTO{
    constructor(
        public newPassword?: string, 
        public oldPassword?: string
        ) {}
}