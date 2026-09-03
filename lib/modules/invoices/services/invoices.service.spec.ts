import { HttpService } from "@nestjs/axios";
import type { Mocked } from "@suites/unit";
import { TestBed } from "@suites/unit";
import { firstValueFrom, of } from "rxjs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import {
    CreateQuickBooksInvoicesDto,
    FullUpdateQuickBooksInvoicesDto,
    QuickBooksInvoices,
    SparseUpdateQuickBooksInvoicesDto
} from "..";
import { QuickBooksInvoicesService, QuickBooksCompanyInvoicesService } from "./invoices.service";

const enhancedInclude = { include: "enhancedAllCustomFields" };

const createDto: CreateQuickBooksInvoicesDto = {
    CustomerRef: { value: "1" },
    Line: [{
        DetailType: "SalesItemLineDetail",
        Amount: 100,
        SalesItemLineDetail: {}
    }],
    CustomField: [{
        DefinitionId: "100000000000000001",
        StringValue: "11111111-1111-1111-1111-111111111111"
    }]
};

const updateDto: FullUpdateQuickBooksInvoicesDto = {
    ...createDto,
    Line: [{
        Id: "1",
        DetailType: "SalesItemLineDetail",
        Amount: 100,
        SalesItemLineDetail: {}
    }]
};

const sparseDto: SparseUpdateQuickBooksInvoicesDto = {
    CustomField: createDto.CustomField
};

const invoice = {
    Id: "42",
    SyncToken: "0"
} as QuickBooksInvoices;

describe(QuickBooksCompanyInvoicesService, () => {
    let underTest: QuickBooksCompanyInvoicesService;

    let http: Mocked<HttpService>;

    beforeEach(async () => {
        const { unit, unitRef } = await TestBed.solitary(QuickBooksInvoicesService)
            .mock(HttpService)
            .impl(() => ({
                get: vi.fn().mockReturnValue(of({ data: {} })),
                post: vi.fn().mockReturnValue(of({ data: {} }))
            }))
            .mock(QuickBooksAuthService)
            .final({
                getToken: vi.fn().mockReturnValue(of("access-token")),
                minorVersion: "65",
                mode: "sandbox"
            })
            .compile();

        underTest = unit.forCompany("123");

        http = unitRef.get(HttpService);
    });

    describe("create", () => {
        it("posts the invoice without include", async () => {
            await firstValueFrom(underTest.create(createDto));

            expect(http.post).toHaveBeenCalledWith(
                "https://sandbox-quickbooks.api.intuit.com/v3/company/123/invoice",
                createDto,
                expect.objectContaining({
                    params: { minorversion: "65" }
                })
            );
        });

        it("posts CustomField with include=enhancedAllCustomFields", async () => {
            await firstValueFrom(underTest.create(createDto, enhancedInclude));

            expect(http.post).toHaveBeenCalledWith(
                "https://sandbox-quickbooks.api.intuit.com/v3/company/123/invoice",
                createDto,
                expect.objectContaining({
                    params: {
                        minorversion: "65",
                        include: "enhancedAllCustomFields"
                    }
                })
            );
        });
    });

    describe("readById", () => {
        it("gets the invoice without include", async () => {
            await firstValueFrom(underTest.readById("42"));

            expect(http.get).toHaveBeenCalledWith(
                "https://sandbox-quickbooks.api.intuit.com/v3/company/123/invoice/42",
                expect.objectContaining({
                    params: { minorversion: "65" }
                })
            );
        });

        it("gets the invoice with include=enhancedAllCustomFields", async () => {
            await firstValueFrom(underTest.readById("42", enhancedInclude));

            expect(http.get).toHaveBeenCalledWith(
                "https://sandbox-quickbooks.api.intuit.com/v3/company/123/invoice/42",
                expect.objectContaining({
                    params: {
                        minorversion: "65",
                        include: "enhancedAllCustomFields"
                    }
                })
            );
        });
    });

    describe("query", () => {
        it("forwards include as an HTTP param and keeps it out of the SQL query", async () => {
            await firstValueFrom(underTest.query({}, {
                include: "enhancedAllCustomFields",
                maxResult: 10
            }));

            expect(http.get).toHaveBeenCalledTimes(1);
            const [url, config] = http.get.mock.calls[0];
            const parsed = new URL(url as string);

            expect(parsed.pathname).toBe("/v3/company/123/query");
            expect(parsed.searchParams.get("query")).toBe("select * from invoice maxresults 10");
            expect(parsed.searchParams.has("include")).toBeFalsy();
            expect(config.params).toStrictEqual({
                minorversion: "65",
                include: "enhancedAllCustomFields"
            });
        });

        it("does not send include when QueryOptions omits it", async () => {
            await firstValueFrom(underTest.query({}));

            expect(http.get).toHaveBeenCalledWith(
                expect.stringContaining("/v3/company/123/query?"),
                expect.objectContaining({
                    params: { minorversion: "65" }
                })
            );
        });
    });

    describe("count", () => {
        it("forwards include as an HTTP param", async () => {
            await firstValueFrom(underTest.count({}, enhancedInclude));

            expect(http.get).toHaveBeenCalledWith(
                expect.stringContaining("/v3/company/123/query?"),
                expect.objectContaining({
                    params: {
                        minorversion: "65",
                        include: "enhancedAllCustomFields"
                    }
                })
            );
        });
    });

    describe("fullUpdate", () => {
        it("posts id/token/dto with include", async () => {
            await firstValueFrom(underTest.fullUpdate("42", "0", updateDto, enhancedInclude));

            expect(http.post).toHaveBeenCalledWith(
                "https://sandbox-quickbooks.api.intuit.com/v3/company/123/invoice",
                {
                    ...updateDto,
                    Id: "42",
                    SyncToken: "0"
                },
                expect.objectContaining({
                    params: {
                        minorversion: "65",
                        include: "enhancedAllCustomFields"
                    }
                })
            );
        });

        it("posts an invoice entity with include", async () => {
            await firstValueFrom(underTest.fullUpdate(invoice, updateDto, enhancedInclude));

            expect(http.post).toHaveBeenCalledWith(
                "https://sandbox-quickbooks.api.intuit.com/v3/company/123/invoice",
                {
                    ...updateDto,
                    Id: "42",
                    SyncToken: "0"
                },
                expect.objectContaining({
                    params: {
                        minorversion: "65",
                        include: "enhancedAllCustomFields"
                    }
                })
            );
        });
    });

    describe("sparseUpdate", () => {
        it("posts a sparse update with include", async () => {
            await firstValueFrom(underTest.sparseUpdate("42", "0", sparseDto, enhancedInclude));

            expect(http.post).toHaveBeenCalledWith(
                "https://sandbox-quickbooks.api.intuit.com/v3/company/123/invoice",
                {
                    ...sparseDto,
                    Id: "42",
                    SyncToken: "0",
                    sparse: true
                },
                expect.objectContaining({
                    params: {
                        minorversion: "65",
                        include: "enhancedAllCustomFields"
                    }
                })
            );
        });
    });
});
