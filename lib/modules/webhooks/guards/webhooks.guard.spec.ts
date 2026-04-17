import { ExecutionContext } from "@nestjs/common";
import * as crypto from "crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { QuickBooksConfigModel } from "../../config";
import { QuickbooksCloudEvent } from "../models/webhooks.model";
import { QuickBooksWebhooksGuard } from "./webhooks.guard";

function createCloudEvent(overrides: Partial<QuickbooksCloudEvent> = {}): QuickbooksCloudEvent {
    return {
        specversion: "1.0",
        id: "88cd52aa-33b6-4351-9aa4-47572edbd068",
        source: "intuit.dsnBgbseACLLRZNxo2dfc4evmEJdxde58xeeYcZliOU=",
        type: "qbo.customer.created.v1",
        datacontenttype: "application/json",
        time: "2025-09-10T21:31:25.179851517Z",
        intuitentityid: "1234",
        intuitaccountid: "310687",
        data: {},
        ...overrides
    };
}

/** UTF-8 bytes of the JSON as on the wire (test fixture for rawBody). */
function wirePayload(body: unknown): Buffer {
    return Buffer.from(JSON.stringify(body), "utf8");
}

function signRawPayload(raw: Buffer, secret: string): string {
    return crypto.createHmac("sha256", secret).update(new Uint8Array(raw)).digest("base64");
}

function buildContext(
    body: unknown,
    headers: Record<string, string> = {},
    rawBody?: Buffer
): ExecutionContext {
    const raw = rawBody ?? wirePayload(body);
    return {
        switchToHttp: () => ({
            getRequest: () => ({
                body,
                rawBody: raw,
                get: (name: string) => headers[name.toLowerCase()]
            })
        })
    } as ExecutionContext;
}

/** Request with parsed body but no rawBody (e.g. app bootstrapped without { rawBody: true }). */
function buildContextWithoutRawBody(body: unknown, headers: Record<string, string> = {}): ExecutionContext {
    return {
        switchToHttp: () => ({
            getRequest: () => ({
                body,
                get: (name: string) => headers[name.toLowerCase()]
            })
        })
    } as ExecutionContext;
}

const verifier = "test-webhook-verifier-token";

describe("QuickBooksWebhooksGuard", () => {
    let underTest: QuickBooksWebhooksGuard;

    beforeEach(() => {
        underTest = new QuickBooksWebhooksGuard({ webhookVerifier: verifier } as QuickBooksConfigModel);
    });

    describe("rejects with false", () => {
        it("returns false when intuit-signature header is missing", async () => {
            const body = [createCloudEvent()];
            const context = buildContext(body);

            await expect(underTest.canActivate(context)).resolves.toBe(false);
        });

        it("returns false when intuit-signature is present but rawBody is missing", async () => {
            const body = [createCloudEvent()];
            const raw = wirePayload(body);
            const signature = signRawPayload(raw, verifier);
            const context = buildContextWithoutRawBody(body, { "intuit-signature": signature });

            await expect(underTest.canActivate(context)).resolves.toBe(false);
        });

        it("returns false when rawBody is empty", async () => {
            const body = [createCloudEvent()];
            const context = buildContext(body, { "intuit-signature": "dGVzdA==" }, Buffer.alloc(0));

            await expect(underTest.canActivate(context)).resolves.toBe(false);
        });

        it("returns false when intuit-signature is invalid (not matching HMAC)", async () => {
            const body = [createCloudEvent()];
            const context = buildContext(body, { "intuit-signature": "invalid-signature" });

            await expect(underTest.canActivate(context)).resolves.toBe(false);
        });

        it("returns false when signature was computed with a different verifier token", async () => {
            const body = [createCloudEvent()];
            const raw = wirePayload(body);
            const signature = signRawPayload(raw, "wrong-verifier");
            const context = buildContext(body, { "intuit-signature": signature });

            await expect(underTest.canActivate(context)).resolves.toBe(false);
        });
    });

    describe("accepts with true", () => {
        it("returns true for a valid intuit-signature over rawBody (single event)", async () => {
            const body = [createCloudEvent()];
            const raw = wirePayload(body);
            const signature = signRawPayload(raw, verifier);
            const context = buildContext(body, { "intuit-signature": signature });

            await expect(underTest.canActivate(context)).resolves.toBe(true);
        });

        it("returns true for a valid intuit-signature over rawBody (multiple events)", async () => {
            const body = [
                createCloudEvent({
                    type: "qbo.invoice.created.v1",
                    intuitentityid: "100"
                }),
                createCloudEvent({
                    type: "qbo.customer.updated.v1",
                    intuitentityid: "200"
                })
            ];
            const raw = wirePayload(body);
            const signature = signRawPayload(raw, verifier);
            const context = buildContext(body, { "intuit-signature": signature });

            await expect(underTest.canActivate(context)).resolves.toBe(true);
        });
    });
});
