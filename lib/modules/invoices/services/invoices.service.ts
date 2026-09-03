import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
import { QuickBooksHttpQueryParams } from "../../common/models";
import { QuickBooksStore } from "../../store";
import { QuickBooksInvoices } from "..";
import { QuickBooksInvoicesQueryModel } from "..";
import { CreateQuickBooksInvoicesDto, FullUpdateQuickBooksInvoicesDto, SparseUpdateQuickBooksInvoicesDto } from "..";
import {
    QuickBooksInvoicesDeleteResponseModel,
    QuickBooksInvoicesQueryResponseModel,
    QuickBooksInvoicesResponseModel
} from "../models/invoices-response.model";

@Injectable()
export class QuickBooksInvoicesService {
    constructor(
        private readonly authService: QuickBooksAuthService,
        private readonly http: HttpService,
        private readonly store: QuickBooksStore
    ) {}

    public async withDefaultCompany(): Promise<QuickBooksCompanyInvoicesService> {
        return this.forCompany(await this.store.getDefaultCompany());
    }

    public forCompany(realm: string): QuickBooksCompanyInvoicesService {
        return new QuickBooksCompanyInvoicesService(realm, this.authService, this.http);
    }
}

export class QuickBooksCompanyInvoicesService extends BaseService<
    QuickBooksInvoicesResponseModel, QuickBooksInvoicesQueryModel, QuickBooksInvoicesQueryResponseModel
> {
    constructor(realm: string, authService: QuickBooksAuthService, http: HttpService) {
        super(realm, "invoice", authService, http);
    }

    public create(
        dto: CreateQuickBooksInvoicesDto,
        queryParams?: QuickBooksHttpQueryParams
    ): Observable<QuickBooksInvoicesResponseModel> {
        return this.post(dto, "", queryParams);
    }

    public readById(id: string, queryParams?: QuickBooksHttpQueryParams): Observable<QuickBooksInvoicesResponseModel> {
        return this.get(id, queryParams);
    }

    public getPdf(id: string): Observable<Buffer> {
        return this.get(`${id}/pdf`, null, {
            Accept: "application/pdf"
        });
    }

    public fullUpdate(
        id: string,
        token: string,
        dto: FullUpdateQuickBooksInvoicesDto,
        queryParams?: QuickBooksHttpQueryParams
    ): Observable<QuickBooksInvoicesResponseModel>;
    public fullUpdate(
        invoice: QuickBooksInvoices,
        dto: FullUpdateQuickBooksInvoicesDto,
        queryParams?: QuickBooksHttpQueryParams
    ): Observable<QuickBooksInvoicesResponseModel>;
    public fullUpdate(
        ...args: [
            string | QuickBooksInvoices,
            string | FullUpdateQuickBooksInvoicesDto,
            FullUpdateQuickBooksInvoicesDto | QuickBooksHttpQueryParams | undefined,
            QuickBooksHttpQueryParams?
        ]
    ): Observable<QuickBooksInvoicesResponseModel> {
        const [id, token, dto, queryParams] = QuickBooksCompanyInvoicesService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token
        }, "", queryParams);
    }

    public sparseUpdate(
        id: string,
        token: string,
        dto: SparseUpdateQuickBooksInvoicesDto,
        queryParams?: QuickBooksHttpQueryParams
    ): Observable<QuickBooksInvoicesResponseModel>;
    public sparseUpdate(
        invoice: QuickBooksInvoices,
        dto: SparseUpdateQuickBooksInvoicesDto,
        queryParams?: QuickBooksHttpQueryParams
    ): Observable<QuickBooksInvoicesResponseModel>;
    public sparseUpdate(
        ...args: [
            string | QuickBooksInvoices,
            string | SparseUpdateQuickBooksInvoicesDto,
            SparseUpdateQuickBooksInvoicesDto | QuickBooksHttpQueryParams | undefined,
            QuickBooksHttpQueryParams?
        ]
    ): Observable<QuickBooksInvoicesResponseModel> {
        const [id, token, dto, queryParams] = QuickBooksCompanyInvoicesService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token,
            sparse: true
        }, "", queryParams);
    }

    public delete(id: string, token: string): Observable<QuickBooksInvoicesDeleteResponseModel>;
    public delete(invoice: QuickBooksInvoices): Observable<QuickBooksInvoicesDeleteResponseModel>;
    public delete(...args: [string | QuickBooksInvoices, string?]): Observable<QuickBooksInvoicesDeleteResponseModel> {
        const [id, token] = QuickBooksCompanyInvoicesService.getOperationArguments(args);
        return this.post({
            Id: id,
            SyncToken: token
        }, "", {
            operation: "delete"
        });
    }

    public void(id: string, token: string): Observable<QuickBooksInvoicesResponseModel>;
    public void(invoice: QuickBooksInvoices): Observable<QuickBooksInvoicesResponseModel>;
    public void(...args: [string | QuickBooksInvoices, string?]): Observable<QuickBooksInvoicesResponseModel> {
        const [id, token] = QuickBooksCompanyInvoicesService.getOperationArguments(args);
        return this.post({
            Id: id,
            SyncToken: token
        }, "", {
            operation: "void"
        });
    }

    private static getUpdateArguments<DTO>(
        args: [
            string | QuickBooksInvoices,
            string | DTO,
            DTO | QuickBooksHttpQueryParams | undefined,
            QuickBooksHttpQueryParams?
        ]
    ): [string, string, DTO, QuickBooksHttpQueryParams | undefined] {
        const [idOrInvoice, tokenOrDto, dtoOrQueryParams, queryParams] = args;
        if (typeof idOrInvoice === "string") {
            return [idOrInvoice, tokenOrDto as string, dtoOrQueryParams as DTO, queryParams];
        }

        const invoice = idOrInvoice as QuickBooksInvoices;
        return [invoice.Id, invoice.SyncToken, tokenOrDto as DTO, dtoOrQueryParams as QuickBooksHttpQueryParams | undefined];
    }

    private static getOperationArguments(args: [string | QuickBooksInvoices, string?]): [string, string] {
        const [idOrInvoice, token] = args;
        if (token) {
            return [idOrInvoice as string, token];
        }

        const invoice = idOrInvoice as QuickBooksInvoices;
        return [invoice.Id, invoice.SyncToken];
    }
}
