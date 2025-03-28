import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { AccountService } from "src/account/account.service";

@Injectable()
export class UniqueEmailPipe implements PipeTransform {
   constructor(private readonly accountService: AccountService) {}

   async transform(value: any, metadata: ArgumentMetadata) {
      if (!value.email) {
         value
      }
      const exsistingAccount = await this.accountService.getAccountByEmail(value.email)
      if (exsistingAccount) {
         throw new BadRequestException("Email was exsist")
      }
      return value;
   }
}