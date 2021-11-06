import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
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

    public create(dto: CreateQuickBooksInvoicesDto): Observable<QuickBooksInvoicesResponseModel> {
        return this.post(dto);
    }

    public readById(id: string): Observable<QuickBooksInvoicesResponseModel> {
        return this.get(id);
    }

    public getPdf(id: string): Observable<Buffer> {
        return this.get(`${id}/pdf`, null, {
            Accept: "application/pdf"
        });
    }

    public fullUpdate(id: string, token: string, dto: FullUpdateQuickBooksInvoicesDto): Observable<QuickBooksInvoicesResponseModel>;
    public fullUpdate(invoice: QuickBooksInvoices, dto: FullUpdateQuickBooksInvoicesDto): Observable<QuickBooksInvoicesResponseModel>;
    public fullUpdate(
        ...args: [string | QuickBooksInvoices, string | FullUpdateQuickBooksInvoicesDto, FullUpdateQuickBooksInvoicesDto?]
    ): Observable<QuickBooksInvoicesResponseModel> {
        const [id, token, dto] = QuickBooksCompanyInvoicesService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token
        });
    }

    public sparseUpdate(id: string, token: string, dto: SparseUpdateQuickBooksInvoicesDto): Observable<QuickBooksInvoicesResponseModel>;
    public sparseUpdate(invoice: QuickBooksInvoices, dto: SparseUpdateQuickBooksInvoicesDto): Observable<QuickBooksInvoicesResponseModel>;
    public sparseUpdate(
        ...args: [string | QuickBooksInvoices, string | SparseUpdateQuickBooksInvoicesDto, SparseUpdateQuickBooksInvoicesDto?]
    ): Observable<QuickBooksInvoicesResponseModel> {
        const [id, token, dto] = QuickBooksCompanyInvoicesService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token,
            sparse: true
        });
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

    private static getUpdateArguments<DTO>(args: [string | QuickBooksInvoices, string | DTO, DTO?]): [string, string, DTO] {
        const [idOrInvoice, tokenOrDto, dto] = args;
        if (dto) {
            return [idOrInvoice as string, tokenOrDto as string, dto];
        }

        const invoice = idOrInvoice as QuickBooksInvoices;
        return [invoice.Id, invoice.SyncToken, tokenOrDto as DTO];
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
