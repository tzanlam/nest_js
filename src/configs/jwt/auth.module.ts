import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";
import { AuthService } from "./auth.service";
import { AccountModule } from "src/account/account.module";

@Module({
   imports: [
      PassportModule,
      JwtModule.register({
         secret: process.env.JWT_SECRET || "mysecretkey",
         signOptions: { expiresIn: '1h' },
      }),
      AccountModule
   ],
   controllers: [AuthController],
   providers: [AuthService, JwtStrategy],
   exports: [AuthService]
})

export class AuthModule {}