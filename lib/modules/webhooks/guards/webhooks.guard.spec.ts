import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
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

function sign(payload: unknown, secret: string): string {
    return crypto.createHmac("sha256", secret).update(JSON.stringify(payload)).digest("base64");
}

function buildContext(body: unknown, headers: Record<string, string> = {}): ExecutionContext {
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

    it("should reject requests without intuit-signature header", async () => {
        const body = [createCloudEvent()];
        const context = buildContext(body);

        await expect(underTest.canActivate(context)).rejects.toThrow(UnauthorizedException);
    });

    it("should reject requests with an invalid signature", async () => {
        const body = [createCloudEvent()];
        const signature = "invalid-signature";
        const context = buildContext(body, { "intuit-signature": signature });

        await expect(underTest.canActivate(context)).resolves.toBe(false);
    });

    it("should accept requests with a valid signature (single event)", async () => {
        const body = [createCloudEvent()];
        const signature = sign(body, verifier);
        const context = buildContext(body, { "intuit-signature": signature });

        await expect(underTest.canActivate(context)).resolves.toBe(true);
    });

    it("should accept requests with a valid signature (multiple events)", async () => {
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
        const signature = sign(body, verifier);
        const context = buildContext(body, { "intuit-signature": signature });

        await expect(underTest.canActivate(context)).resolves.toBe(true);
    });

    it("should reject when signature was computed with a different verifier", async () => {
        const body = [createCloudEvent()];
        const signature = sign(body, "wrong-verifier");
        const context = buildContext(body, { "intuit-signature": signature });

        await expect(underTest.canActivate(context)).resolves.toBe(false);
    });
});
