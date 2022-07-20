import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import * as crypto from "crypto";
import { GLOBAL_CONFIG } from "../../../constants";
import { QuickBooksConfigModel } from "../../config";

@Injectable()
export class QuickBooksWebhooksGuard implements CanActivate {
    constructor(@Inject(GLOBAL_CONFIG) public readonly global: QuickBooksConfigModel) {}

    public async canActivate(context: ExecutionContext): Promise<boolean>  {
        const req = context.switchToHttp().getRequest();

        const signature = req.get("intuit-signature");
        if (!signature) {
            throw new UnauthorizedException();
        }

        const webhookPayload = JSON.stringify(req.body);
        if (!webhookPayload) {
            return true;
        }

        const hash = crypto.createHmac("sha256", this.global.webhookVerifier).update(webhookPayload).digest("base64");
        if (signature !== hash) {
            throw new UnauthorizedException();
        }

        return true;
    }
}
