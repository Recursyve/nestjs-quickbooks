import { Injectable } from "@nestjs/common";
import { QuickbooksWebhookEventModel } from "../models/webhooks.model";

@Injectable()
export abstract class QuickbooksWebhookHandlerService {
    public abstract handleEvent(event: QuickbooksWebhookEventModel): Promise<void>;
}
