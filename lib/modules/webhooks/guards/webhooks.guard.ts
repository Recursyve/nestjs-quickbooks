import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import * as crypto from "crypto";
import { GLOBAL_CONFIG } from "../../../constants";
import { QuickBooksConfigModel } from "../../config";

type WebhookRequest = {
    rawBody?: Buffer;
    get(name: string): string | undefined;
};

@Injectable()
export class QuickBooksWebhooksGuard implements CanActivate {
    constructor(@Inject(GLOBAL_CONFIG) public readonly global: QuickBooksConfigModel) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<WebhookRequest>();

        const signature = req.get("intuit-signature");
        if (!signature) {
            return false;
        }

        const rawBody = req.rawBody;
        if (!rawBody?.length) {
            return false;
        }

        const hash = crypto
            .createHmac("sha256", this.global.webhookVerifier)
            .update(new Uint8Array(rawBody))
            .digest("base64");

        const signatureBuf = Buffer.from(signature, "base64");
        const hashBuf = Buffer.from(hash, "base64");
        if (
            signatureBuf.length !== hashBuf.length ||
            !crypto.timingSafeEqual(new Uint8Array(signatureBuf), new Uint8Array(hashBuf))
        ) {
            return false;
        }

        return true;
    }
}
