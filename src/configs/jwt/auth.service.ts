import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AccountService } from "src/account/account.service";
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
   constructor(
      private readonly jwtService: JwtService,
      private readonly accountService: AccountService
   ) {}

   async validateAccount(email: string, password: string): Promise<any> {
      const account = await this.accountService.getAccountByEmail(email)
      if (account && (await bcrypt.compare(password, account.password))) {
         const { password, ...result} = account;
         return result
      }
   }

   async login(request: any) {
      const payload = { sub: request.id, email: request.email}
      return {
         accessToken: this.jwtService.sign(payload)
      }
   }

   async vertifyToken(token: string) {
      try{
         return this.jwtService.verify(token)
      }catch(err) {
         throw new UnauthorizedException("Invalid token")
      }
   }
}