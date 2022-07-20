import { DynamicModule, ForwardReference, Module, Type } from "@nestjs/common";
import { QuickBooksWebhooksController } from "./controllers/webhooks.controller";
import { QuickbooksWebhookHandlerService } from "./services/webhook-handler.service";

export interface CustomStripeWebhooksOptions {
    imports?: (Type | DynamicModule | Promise<DynamicModule> | ForwardReference)[];
    webhookHandler: Type<QuickbooksWebhookHandlerService>;
}

export interface ImportsStripeWebhooksOptions {
    imports: [(Type | DynamicModule | Promise<DynamicModule> | ForwardReference)];
}

export type QuickbooksWebhooksOptions = CustomStripeWebhooksOptions | ImportsStripeWebhooksOptions;

@Module({
    controllers: [QuickBooksWebhooksController]
})
export class QuickbooksWebhooksModule {
    public static forRoot(options: QuickbooksWebhooksOptions): DynamicModule {
        return {
            module: QuickbooksWebhooksModule,
            imports: options?.imports ? [...options.imports] : [],
            providers: (options as CustomStripeWebhooksOptions).webhookHandler ? [
                {
                    provide: QuickbooksWebhookHandlerService,
                    useClass: (options as CustomStripeWebhooksOptions).webhookHandler
                }
            ] : []
        };
    }
}
