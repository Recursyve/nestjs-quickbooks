import { Controller, Get, Req, Res } from "@nestjs/common";
import { QuickBooksAuthService } from "../services/auth.service";
import { Request, Response } from "express";
import { QuickBooksConfigService } from "../../config/services/quickbooks-config.service";

@Controller("quickbooks/auth")
export class QuickBooksAuthController {
    constructor(
        private readonly authService: QuickBooksAuthService,
        private readonly configService: QuickBooksConfigService
    ) {}

    @Get()
    public authorize(@Res() res: Response): void {
        res.redirect(this.authService.getAuthorizeUri());
    }

    @Get("return")
    public async authorizeCode(@Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            await this.authService.authorizeCode(req.url);
            res.redirect(this.configService.global.redirection.successUrl);
        } catch (e) {
            res.redirect(this.configService.global.redirection.errorUrl);
        }
    }
}
