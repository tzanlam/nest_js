import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Account } from "./account.entity";
import { Repository } from "typeorm";
import { AccountDTO } from "./account.dto";
import { AccountRequest } from "./account.request";
import { hash } from "bcryptjs";

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
    ) {}

    // get
    async getAccounts(): Promise<AccountDTO[]> {
        const accounts = await this.accountRepository.find();
        return accounts.map((acc) => new AccountDTO(acc))
    }

    // get by id
    async getAccountById(id: number): Promise<AccountDTO> {
        const account = await this.accountRepository.findOne({where: {id}});
        if (account === null) {
            throw new NotFoundException("Account not found")
        }
        return new AccountDTO(account)
    }

    // get by email
    async getAccountByEmail(email: string): Promise<AccountDTO> {
        const response = await this.accountRepository.findOne({where: {email}})
        if (response === null){
            throw new NotFoundException("Account not found with email")
        }
        return new AccountDTO(response);
    }

    // create
    async createAccount(request: AccountRequest): Promise<AccountDTO> {
        const account = Object.assign(new AccountRequest(), request)
        const acc = await account.register()
        await this.accountRepository.save(acc)
        return new AccountDTO(acc)
    }

    // update
    async updateAccount(id:number, request: AccountRequest): Promise<AccountDTO> {
        const acc = await this.accountRepository.findOne({where: {id}})
        if (!acc) {
            throw new NotFoundException("Account not found")
        }
        const account = this.accountRepository.merge(acc, request);
        await this.accountRepository.save(account)
        return new AccountDTO(account)
    }

    // đổi password
    async updatePassword(id:number, password: string): Promise<AccountDTO> {
        const acc = await this.accountRepository.findOne({ where: {id}})
        if (!acc) {
            throw new NotFoundException("Account Not Found")
        }
        acc.password = await hash(password, 10)
        this.accountRepository.save(acc)
        return new AccountDTO(acc)
    }
}