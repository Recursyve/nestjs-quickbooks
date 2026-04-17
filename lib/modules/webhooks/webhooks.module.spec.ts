import { Injectable, Module } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as crypto from "crypto";
import supertest from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { GLOBAL_CONFIG } from "../../constants";
import type { QuickbooksCloudEvent, QuickbooksWebhookPayload } from "./models/webhooks.model";
import { QuickbooksWebhookHandlerService } from "./services/webhook-handler.service";
import { QuickbooksWebhooksModule } from "./webhooks.module";

const WEBHOOK_VERIFIER = "integration-test-webhook-verifier";

function signRaw(raw: Buffer): string {
    return crypto.createHmac("sha256", WEBHOOK_VERIFIER).update(new Uint8Array(raw)).digest("base64");
}

function sampleEvent(): QuickbooksCloudEvent {
    return {
        specversion: "1.0",
        id: "88cd52aa-33b6-4351-9aa4-47572edbd068",
        source: "intuit.test=",
        type: "qbo.customer.created.v1",
        datacontenttype: "application/json",
        time: "2025-09-10T21:31:25.179851517Z",
        intuitentityid: "1234",
        intuitaccountid: "310687",
        data: {}
    };
}

@Injectable()
class IntegrationTestWebhookHandler extends QuickbooksWebhookHandlerService {
    public readonly handleEvent = vi.fn();
}

/**
 * `ImportsQuickbooksWebhooksOptions` wiring: exports both GLOBAL_CONFIG and handler so they are
 * registered inside `QuickbooksWebhooksModule` (guard + controller DI).
 */
@Module({
    providers: [
        {
            provide: GLOBAL_CONFIG,
            useValue: {
                webhookVerifier: WEBHOOK_VERIFIER
            }
        },
        {
            provide: QuickbooksWebhookHandlerService,
            useClass: IntegrationTestWebhookHandler
        }
    ],
    exports: [GLOBAL_CONFIG, QuickbooksWebhookHandlerService]
})
class WebhooksTestDepsModule {}

describe("QuickbooksWebhooksModule", () => {
    describe("HTTP + body parser", () => {
        let app: import("@nestjs/common").INestApplication;
        let handler: IntegrationTestWebhookHandler;

        beforeAll(async () => {
            const testingModule = await Test.createTestingModule({
                imports: [
                    QuickbooksWebhooksModule.forRoot({
                        imports: [WebhooksTestDepsModule]
                    })
                ]
            }).compile();

            // No global JSON parser: webhook route is parsed only by module middleware (rawBody + JSON).
            app = testingModule.createNestApplication({ bodyParser: false });
            handler = testingModule.get(QuickbooksWebhookHandlerService) as IntegrationTestWebhookHandler;
            await app.init();
        });

        afterAll(async () => {
            await app.close();
        });

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it("returns 204 for application/cloudevents-batch+json with valid intuit-signature", async () => {
            const payload: QuickbooksWebhookPayload = [sampleEvent()];
            const body = JSON.stringify(payload);
            const raw = Buffer.from(body, "utf8");

            await supertest(app.getHttpServer())
                .post("/quickbooks/webhook")
                .set("Content-Type", "application/cloudevents-batch+json")
                .set("intuit-signature", signRaw(raw))
                .send(body)
                .expect(204);

            expect(handler.handleEvent).toHaveBeenCalledTimes(1);
            expect(handler.handleEvent).toHaveBeenCalledWith(payload);
        });

        it("returns 403 when intuit-signature does not match raw body (cloudevents-batch+json)", async () => {
            const payload: QuickbooksWebhookPayload = [sampleEvent()];
            const body = JSON.stringify(payload);
            const wrongSig = crypto.randomBytes(32).toString("base64");

            await supertest(app.getHttpServer())
                .post("/quickbooks/webhook")
                .set("Content-Type", "application/cloudevents-batch+json")
                .set("intuit-signature", wrongSig)
                .send(body)
                .expect(403);

            expect(handler.handleEvent).not.toHaveBeenCalled();
        });

        it("returns 204 for application/json with valid intuit-signature", async () => {
            const payload: QuickbooksWebhookPayload = [sampleEvent()];
            const body = JSON.stringify(payload);
            const raw = Buffer.from(body, "utf8");

            await supertest(app.getHttpServer())
                .post("/quickbooks/webhook")
                .set("Content-Type", "application/json")
                .set("intuit-signature", signRaw(raw))
                .send(body)
                .expect(204);

            expect(handler.handleEvent).toHaveBeenCalledTimes(1);
            expect(handler.handleEvent).toHaveBeenCalledWith(payload);
        });
    });
});
