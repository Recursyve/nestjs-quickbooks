import { HttpService, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
import { QuickBooksStore } from "../../store/store.service";
import { QuickBooksInvoices } from "../models/invoices.model";
import { QuickBooksInvoicesQuery } from "../models/invoices.query";
import { CreateQuickBooksInvoicesDto, FullQuickBooksUpdateInvoicesDto, SparseQuickBooksUpdateInvoicesDto } from "../dto/invoices.dto";

export interface QuickBooksInvoicesQueryResponse {
    QueryResponse: {
        Invoice: QuickBooksInvoices[];
        startPosition: number;
        maxResults: number;
    };
    time: string;
}

export interface QuickBooksInvoicesDeleteResponse {
    Invoice: {
        Id: string;
        status: string;
        domain: number;
    };
    time: string;
}

@Injectable()
export class QuickBooksInvoicesService {
    constructor(
        private readonly authService: QuickBooksAuthService,
        private readonly http: HttpService,
        private readonly store: QuickBooksStore
    ) {}

    public async withDefaultCompany(): Promise<CompanyInvoicesService> {
        return this.forCompany(await this.store.getDefaultCompany());
    }

    public forCompany(realm: string): CompanyInvoicesService {
        return new CompanyInvoicesService(realm, this.authService, this.http);
    }
}

class CompanyInvoicesService extends BaseService<QuickBooksInvoices, QuickBooksInvoicesQuery, QuickBooksInvoicesQueryResponse> {
    constructor(realm: string, authService: QuickBooksAuthService, http: HttpService) {
        super(realm, "invoice", authService, http);
    }

    public create(dto: CreateQuickBooksInvoicesDto): Observable<QuickBooksInvoices> {
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

    public fullUpdate(id: string, token: string, dto: FullQuickBooksUpdateInvoicesDto): Observable<QuickBooksInvoices>;
    public fullUpdate(invoice: QuickBooksInvoices, dto: FullQuickBooksUpdateInvoicesDto): Observable<QuickBooksInvoices>;
    public fullUpdate(
        ...args: [string | QuickBooksInvoices, string | FullQuickBooksUpdateInvoicesDto, FullQuickBooksUpdateInvoicesDto?]
    ): Observable<QuickBooksInvoices> {
        const [id, token, dto] = CompanyInvoicesService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token
        });
    }

    public sparseUpdate(id: string, token: string, dto: SparseQuickBooksUpdateInvoicesDto): Observable<QuickBooksInvoices>;
    public sparseUpdate(invoice: QuickBooksInvoices, dto: SparseQuickBooksUpdateInvoicesDto): Observable<QuickBooksInvoices>;
    public sparseUpdate(
        ...args: [string | QuickBooksInvoices, string | SparseQuickBooksUpdateInvoicesDto, SparseQuickBooksUpdateInvoicesDto?]
    ): Observable<QuickBooksInvoices> {
        const [id, token, dto] = CompanyInvoicesService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token,
            sparse: true
        });
    }

    public delete(id: string, token: string): Observable<QuickBooksInvoicesDeleteResponse>;
    public delete(invoice: QuickBooksInvoices): Observable<QuickBooksInvoicesDeleteResponse>;
    public delete(...args: [string | QuickBooksInvoices, string?]): Observable<QuickBooksInvoicesDeleteResponse> {
        const [id, token] = CompanyInvoicesService.getOperationArguments(args);
        return this.post({
            Id: id,
            SyncToken: token
        }, "", {
            operation: "delete"
        });
    }

    public void(id: string, token: string): Observable<QuickBooksInvoicesDeleteResponse>;
    public void(invoice: QuickBooksInvoices): Observable<QuickBooksInvoicesDeleteResponse>;
    public void(...args: [string | QuickBooksInvoices, string?]): Observable<QuickBooksInvoicesDeleteResponse> {
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
