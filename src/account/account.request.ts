import { IsEmail, IsNotEmpty } from "class-validator";
import { Account, Position } from "./account.entity";
import { hash } from "bcryptjs";

export class AccountRequest {
    @IsNotEmpty()
    username!: string;

    @IsNotEmpty()
    password!: string;

    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    fullName!: string;

    async register(): Promise<Account> {
        const account = new Account();
        account.username = this.username;
        account.password = await hash(this.password, 10);
        account.email = this.email;
        account.fullName = this.fullName;
        account.position = Position.HOTELIER;
        return account;
    }
}