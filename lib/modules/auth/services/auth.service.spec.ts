import { TestBed } from "@suites/unit";
import { beforeEach, describe, expect, it } from "vitest";
import { QuickBooksScopes } from "../../config";
import { QuickBooksConfigService } from "../../config/services/quickbooks-config.service";
import { QuickBooksAuthService } from "./auth.service";

describe(QuickBooksAuthService, () => {
    let underTest: QuickBooksAuthService;

    beforeEach(async () => {
        const { unit } = await TestBed.solitary(QuickBooksAuthService)
            .mock(QuickBooksConfigService)
            .final({
                global: {
                    clientId: "test-client-id",
                    clientSecret: "test-client-secret",
                    mode: "sandbox",
                    redirection: {
                        successUrl: "http://localhost:3000/success",
                        errorUrl: "http://localhost:3000/error"
                    },
                    scopes: [QuickBooksScopes.Accounting],
                    serverUri: "http://localhost:3000",
                    webhookVerifier: "test-webhook-verifier"
                }
            })
            .compile();

        underTest = unit;
    });

    describe("getAuthorizeUri", () => {
        it("constructs an uri with the correct origin", () => {
            const uri = new URL(underTest.getAuthorizeUri());

            expect(uri.origin).toBe("https://appcenter.intuit.com");
        });

        it("constructs an uri with the correct pathname", () => {
            const uri = new URL(underTest.getAuthorizeUri());

            expect(uri.pathname).toBe("/connect/oauth2");
        });

        it("constructs an uri with the correct params", () => {
            const uri = new URL(underTest.getAuthorizeUri());

            expect(Object.fromEntries(uri.searchParams)).toStrictEqual({
                client_id: "test-client-id",
                redirect_uri: "http://localhost:3000/quickbooks/auth/return",
                response_type: "code",
                scope: QuickBooksScopes.Accounting,
                state: "nestjs-client-state"
            });
        });
    });
});
