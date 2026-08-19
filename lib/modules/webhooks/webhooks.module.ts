import { DynamicModule, ForwardReference, Inject, Module, NestModule, Optional, RequestMethod, Type } from "@nestjs/common";
import type { RawBodyRequest, MiddlewareConsumer, Provider } from "@nestjs/common";
import { VersionValue } from "@nestjs/common/interfaces";
import { json } from "body-parser";
import { QuickBooksWebhooksController } from "./controllers/webhooks.controller";
import { QuickbooksWebhookHandlerService } from "./services/webhook-handler.service";

export interface CustomQuickbooksWebhooksOptions {
    imports?: (Type | DynamicModule | Promise<DynamicModule> | ForwardReference)[];
    webhookHandler: Type<QuickbooksWebhookHandlerService>;
    version?: VersionValue;
}

export interface ImportsQuickbooksWebhooksOptions {
    imports: [Type | DynamicModule | Promise<DynamicModule> | ForwardReference];
    version?: VersionValue;
}

export type QuickbooksWebhooksOptions = CustomQuickbooksWebhooksOptions | ImportsQuickbooksWebhooksOptions;

const QUICKBOOKS_WEBHOOKS_VERSION = Symbol("QUICKBOOKS_WEBHOOKS_VERSION");

@Module({
    controllers: [QuickBooksWebhooksController]
})
export class QuickbooksWebhooksModule implements NestModule {
    constructor(@Inject(QUICKBOOKS_WEBHOOKS_VERSION) private readonly version?: VersionValue) {}

    public configure(consumer: MiddlewareConsumer): void {
        const middleware = json({
            type: ["application/json", "application/cloudevents+json", "application/cloudevents-batch+json"],
            verify: (request, _, buffer) => {
                (request as RawBodyRequest<unknown>).rawBody = buffer;
            }
        });

        consumer.apply(middleware).forRoutes({
            path: "quickbooks/webhook",
            method: RequestMethod.POST,
            version: this.version
        });
    }

    public static forRoot(options: QuickbooksWebhooksOptions): DynamicModule {
        const providers: Provider[] = [{ provide: QUICKBOOKS_WEBHOOKS_VERSION, useValue: options.version }];

        if ("webhookHandler" in options) {
            providers.push({ provide: QuickbooksWebhookHandlerService, useClass: options.webhookHandler });
        }

        return {
            module: QuickbooksWebhooksModule,
            imports: options?.imports ? [...options.imports] : [],
            providers
        };
    }
}
