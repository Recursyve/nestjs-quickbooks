import { Injectable } from "@nestjs/common";
import { QuickbooksWebhookPayload } from "../models/webhooks.model";

@Injectable()
export abstract class QuickbooksWebhookHandlerService {
    public abstract handleEvent(payload: QuickbooksWebhookPayload): Promise<void>;
}
