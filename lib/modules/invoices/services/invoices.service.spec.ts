import { HttpService } from "@nestjs/axios";
import type { Mocked } from "@suites/unit";
import { TestBed } from "@suites/unit";
import { firstValueFrom, of } from "rxjs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { QuickBooksInvoicesService, QuickBooksCompanyInvoicesService } from "./invoices.service";

describe(QuickBooksCompanyInvoicesService, () => {
    let underTest: QuickBooksCompanyInvoicesService;

    let http: Mocked<HttpService>;

    beforeEach(async () => {
        const { unit, unitRef } = await TestBed.solitary(QuickBooksInvoicesService)
            .mock(HttpService)
            .impl(() => ({ post: vi.fn().mockReturnValue(of({ data: {} })) }))
            .mock(QuickBooksAuthService)
            .final({ getToken: vi.fn().mockReturnValue(of("access-token")) })
            .compile();

        underTest = unit.forCompany("123");

        http = unitRef.get(HttpService);
    });

    describe("send", () => {
        it("posts to invoice/{id}/send without sendTo", async () => {
            await firstValueFrom(underTest.send("42"));

            expect(http.post).toHaveBeenCalledWith(
                "https://sandbox-quickbooks.api.intuit.com/v3/company/123/invoice/42/send",
                {},
                expect.objectContaining({
                    params: {}
                })
            );
        });

        it("posts to invoice/{id}/send with sendTo query param", async () => {
            await firstValueFrom(underTest.send("42", "billing@example.com"));

            expect(http.post).toHaveBeenCalledWith(
                "https://sandbox-quickbooks.api.intuit.com/v3/company/123/invoice/42/send",
                {},
                expect.objectContaining({
                    params: { sendTo: "billing@example.com" }
                })
            );
        });
    });
});
