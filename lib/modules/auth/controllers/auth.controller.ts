import { Controller, Get, Req, Res } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { Request, Response } from "express";

@Controller("quickbooks/auth")
export class QuickbooksAuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    public authorize(@Res() res: Response): void {
        res.redirect(this.authService.getAuthorizeUri());
    }

    @Get("return")
    public async authorizeCode(@Req() req: Request, @Res() res: Response): Promise<void> {
        await this.authService.authorizeCode(req.url);
        res.redirect("https://google.com");
    }
}
