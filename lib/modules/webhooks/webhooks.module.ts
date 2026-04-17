import { DynamicModule, ForwardReference, Module, NestModule, RequestMethod, Type } from "@nestjs/common";
import type { RawBodyRequest, MiddlewareConsumer } from "@nestjs/common";
import { json } from "body-parser";
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
export class QuickbooksWebhooksModule implements NestModule {
    public configure(consumer: MiddlewareConsumer): void {
        const middleware = json({
            type: ["application/json", "application/cloudevents+json", "application/cloudevents-batch+json"],
            verify: (request, _, buffer) => {
                (request as RawBodyRequest<unknown>).rawBody = buffer;
            }
        });

        consumer.apply(middleware).forRoutes({
            path: "quickbooks/webhook",
            method: RequestMethod.POST
        });
    }

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
