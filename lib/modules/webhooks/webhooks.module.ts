import { DynamicModule, ForwardReference, Module, Type } from "@nestjs/common";
import { QuickBooksWebhooksController } from "./controllers/webhooks.controller";
import { QuickbooksWebhookHandlerService } from "./services/webhook-handler.service";

export interface CustomQuickbooksWebhooksOptions {
    imports?: (Type | DynamicModule | Promise<DynamicModule> | ForwardReference)[];
    webhookHandler: Type<QuickbooksWebhookHandlerService>;
}

export interface ImportsQuickbooksWebhooksOptions {
    imports: [Type | DynamicModule | Promise<DynamicModule> | ForwardReference];
}

export type QuickbooksWebhooksOptions = CustomQuickbooksWebhooksOptions | ImportsQuickbooksWebhooksOptions;

@Module({
    controllers: [QuickBooksWebhooksController]
})
export class QuickbooksWebhooksModule {
    public static forRoot(options: QuickbooksWebhooksOptions): DynamicModule {
        return {
            module: QuickbooksWebhooksModule,
            imports: options?.imports ? [...options.imports] : [],
            providers: "webhookHandler" in options ? [
                {
                    provide: QuickbooksWebhookHandlerService,
                    useClass: options.webhookHandler
                }
            ] : []
        };
    }
}
