import { Account } from "./account.entity";

export class AccountDTO {
    id!: number;
    username!: string;
    fullName!: string;
    email!: string;
    position!: string;
    password!: string;
    constructor(account: Account){
        this.id = account.id;
        this.username = account.username;
        this.fullName = account.fullName;
        this.email = account.email;
        this.position = account.position.toString();
    }

    static newAccountDTO(account: Account){
        return new AccountDTO(account)
    }
}