import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./public.decorator";
import { LoginRequest } from "src/account/login.request";
import { Response } from "express";

@Controller('api')
export class AuthController {
   constructor(
      private authService: AuthService
   ) {}

   @Public()
   @Post('login')
   async login(@Res() res: Response, @Body() request: LoginRequest) {
      const token = await this.authService.login(request)
      try {
         return res.status(HttpStatus.OK).json({
            data: token
         })
      } catch (error) {
         return res.status(HttpStatus.BAD_REQUEST).json({
            message: "login failed"
         })
      }
   }
}