import { HttpService } from "@nestjs/axios";
import type { Mocked } from "@suites/unit";
import { TestBed } from "@suites/unit";
import FormData from "form-data";
import { firstValueFrom, of } from "rxjs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { QuickBooksAttachablesService, QuickBooksCompanyAttachablesService } from "./attachables.service";

describe(QuickBooksCompanyAttachablesService, () => {
    let underTest: QuickBooksCompanyAttachablesService;

    let http: Mocked<HttpService>;

    beforeEach(async () => {
        const { unit, unitRef } = await TestBed.solitary(QuickBooksAttachablesService)
            .mock(HttpService)
            .impl(() => ({ post: vi.fn().mockReturnValue(of({ data: { AttachableResponse: [] } })) }))
            .mock(QuickBooksAuthService)
            .final({ getToken: vi.fn().mockReturnValue(of("access-token")) })
            .compile();

        underTest = unit.forCompany("123");

        http = unitRef.get(HttpService);
    });

    describe("upload", () => {
        it("posts FormData to the company upload url", async () => {
            await firstValueFrom(
                underTest.upload({
                    FileName: "note.txt",
                    File: Buffer.from("hello"),
                    ContentType: "text/plain"
                })
            );

            expect(http.post).toHaveBeenCalledWith(
                "https://sandbox-quickbooks.api.intuit.com/v3/company/123/upload",
                expect.any(FormData),
                {
                    headers: expect.objectContaining({
                        authorization: "Bearer access-token",
                        accept: "application/json",
                        "content-type": expect.stringMatching(/^multipart\/form-data; boundary=/),
                        "content-length": 445
                    }),
                    params: {}
                }
            );
        });
    });
});
