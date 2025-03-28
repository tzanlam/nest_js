import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { AccountService } from "./account.service";
import { Response } from "express";
import { AccountRequest } from "./account.request";
import { UniqueEmailPipe } from "src/common/pipes/UniqueEmail.pipe";
import { AuthGuard } from "@nestjs/passport";

@Controller("api")
export class AccountController {
    constructor(
        private accountService: AccountService
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Get("/getAccounts")
    async getAll(@Res() res: Response) {
        try {
            const accounts = await this.accountService.getAccounts();
            return res.status(HttpStatus.OK).json({
                message: "Lấy danh sách tài khoản thành công",
                data: accounts
            });
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Lỗi khi lấy danh sách tài khoản",
            });
        }
    }

    @Get("/getAccountById")
    async getAccountById(@Res() res: Response, @Param("accountId") accountId: number) {
        const response = await this.accountService.getAccountById(accountId)
        try{
            return res.status(200).json({
                data: response
            })
        }catch(err){
            return res.status(400).json({
                message: "Lỗi khi lấy account với ID"
            })
        }
    }

    @Post("postAccount")
    async createAccount( @Res() res: Response, @Body(UniqueEmailPipe) request: AccountRequest) {
        const response = await this.accountService.createAccount(request)
        try{
            return res.status(200).json({
                data: response
            })
        }catch(err){
            return res.status(400).json({
                message: "Tạo thất bại"
            })
        }
    }

    @Put("/updateAccount")
    async updateAccount(@Res() res: Response, @Param("accountId") accountId: number, @Body() request: AccountRequest) {
        const response = await this.accountService.updateAccount(accountId, request);
        try{
            return res.status(200).json({
                data: response
            })
        }catch(err){
            return res.status(400).json({
                message: "Thất bại khi cập nhật"
            })
        }
    }

    @Put("/updatePassword")
    async updatePassword(@Res() res: Response, @Param("accountId") accountId: number, @Param("password") password: string) {
        const response = await this.accountService.updatePassword(accountId, password)
        try{
            return res.status(200).json({
                data: response
            })
        }catch(err){
            return res.status(400).json({
                message: "Lỗi khi thay đổi mật khẩu"
            })
        }
    }
}