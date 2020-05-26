import { HttpService, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
import { Store } from "../../store/store";
import { QuickBooksInvoices } from "../models/invoices.model";
import { InvoicesQuery } from "../models/invoices.query";
import { CreateInvoicesDto, FullUpdateInvoicesDto, SparseUpdateInvoicesDto } from "../dto/invoices.dto";

export interface InvoicesQueryResponse {
    QueryResponse: {
        Invoice: QuickBooksInvoices[];
        startPosition: number;
        maxResults: number;
    };
    time: string;
}

export interface InvoicesDeleteResponse {
    Invoice: {
        Id: string;
        status: string;
        domain: number;
    };
    time: string;
}

@Injectable()
export class InvoicesService {
    constructor(
        private readonly authService: AuthService,
        private readonly http: HttpService,
        private readonly store: Store
    ) {}

    public withDefaultCompany(): CompanyInvoicesService {
        return this.forCompany(this.store.getDefaultCompany());
    }

    public forCompany(realm: string): CompanyInvoicesService {
        return new CompanyInvoicesService(realm, this.authService, this.http);
    }
}

export class CompanyInvoicesService extends BaseService<QuickBooksInvoices, InvoicesQuery, InvoicesQueryResponse> {
    constructor(realm: string, authService: AuthService, http: HttpService) {
        super(realm, "invoice", authService, http);
    }

    public create(dto: CreateInvoicesDto): Observable<QuickBooksInvoices> {
        return this.post(dto);
    }

    public readById(id: string): Observable<QuickBooksInvoices> {
        return this.get(id);
    }

    public getPdf(id: string): Observable<Buffer> {
        return this.get(`${id}/pdf`, null, {
            Accept: "application/pdf"
        });
    }

    public fullUpdate(id: string, token: string, dto: FullUpdateInvoicesDto): Observable<QuickBooksInvoices>;
    public fullUpdate(invoice: QuickBooksInvoices, dto: FullUpdateInvoicesDto): Observable<QuickBooksInvoices>;
    public fullUpdate(...args: [string | QuickBooksInvoices, string | FullUpdateInvoicesDto, FullUpdateInvoicesDto?]): Observable<QuickBooksInvoices> {
        const [id, token, dto] = CompanyInvoicesService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token
        });
    }

    public sparseUpdate(id: string, token: string, dto: SparseUpdateInvoicesDto): Observable<QuickBooksInvoices>;
    public sparseUpdate(invoice: QuickBooksInvoices, dto: SparseUpdateInvoicesDto): Observable<QuickBooksInvoices>;
    public sparseUpdate(...args: [string | QuickBooksInvoices, string | SparseUpdateInvoicesDto, SparseUpdateInvoicesDto?]): Observable<QuickBooksInvoices> {
        const [id, token, dto] = CompanyInvoicesService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token,
            sparse: true
        });
    }

    public delete(id: string, token: string): Observable<InvoicesDeleteResponse>;
    public delete(invoice: QuickBooksInvoices): Observable<InvoicesDeleteResponse>;
    public delete(...args: [string | QuickBooksInvoices, string?]): Observable<InvoicesDeleteResponse> {
        const [id, token] = CompanyInvoicesService.getOperationArguments(args);
        return this.post({
            Id: id,
            SyncToken: token
        }, "", {
            operation: "delete"
        });
    }

    public void(id: string, token: string): Observable<InvoicesDeleteResponse>;
    public void(invoice: QuickBooksInvoices): Observable<InvoicesDeleteResponse>;
    public void(...args: [string | QuickBooksInvoices, string?]): Observable<InvoicesDeleteResponse> {
        const [id, token] = CompanyInvoicesService.getOperationArguments(args);
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
