import { beforeEach, describe, expect, it, vi, type Mocked } from "vitest";
import { QuickbooksCloudEvent, QuickbooksWebhookPayload } from "../models/webhooks.model";
import { QuickbooksWebhookHandlerService } from "../services/webhook-handler.service";
import { QuickBooksWebhooksController } from "./webhooks.controller";

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

describe("QuickBooksWebhooksController", () => {
    let underTest: QuickBooksWebhooksController;

    let handler: Mocked<QuickbooksWebhookHandlerService>;

    beforeEach(() => {
        handler = { handleEvent: vi.fn() };
        underTest = new QuickBooksWebhooksController(handler);
    });

    it("should forward the full CloudEvents payload to the handler", async () => {
        const payload: QuickbooksWebhookPayload = [
            createCloudEvent({ type: "qbo.invoice.created.v1", intuitentityid: "100" }),
            createCloudEvent({ type: "qbo.customer.updated.v1", intuitentityid: "200" })
        ];

        await underTest.handleEvent(payload);

        expect(handler.handleEvent).toHaveBeenCalledTimes(1);
        expect(handler.handleEvent).toHaveBeenCalledWith(payload);
    });

    it("should handle an empty payload array", async () => {
        await underTest.handleEvent([]);

        expect(handler.handleEvent).toHaveBeenCalledWith([]);
    });

    it("should propagate errors from the handler", async () => {
        handler.handleEvent.mockRejectedValue(new Error("handler failed"));

        await expect(underTest.handleEvent([createCloudEvent()])).rejects.toThrow("handler failed");
    });
});
