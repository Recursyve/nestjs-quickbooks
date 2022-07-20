import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { QuickBooksWebhooksGuard } from "../guards/webhooks.guard";
import { QuickbooksWebhookEventModel } from "../models/webhooks.model";
import { QuickbooksWebhookHandlerService } from "../services/webhook-handler.service";

@Controller("quickbooks/webhook")
@UseGuards(QuickBooksWebhooksGuard)
export class QuickBooksWebhooksController {
    constructor(private service: QuickbooksWebhookHandlerService) {}

    @Post()
    @HttpCode(HttpStatus.NO_CONTENT)
    public async handleEvent(@Body() body: QuickbooksWebhookEventModel): Promise<void> {
        return this.service.handleEvent(body);
    }
}
