import { HttpService, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
import { Store } from "../../store/store";
import { QuickBooksPayments } from "../models/payments.model";
import { PaymentsQuery } from "../models/payments.query";
import { CreatePaymentsDto, FullUpdatePaymentsDto } from "../dto/payments.dto";

export interface PaymentsQueryResponse {
    QueryResponse: {
        Invoice: QuickBooksPayments[];
        startPosition: number;
        maxResults: number;
    };
    time: string;
}

export interface PaymentsDeleteResponse {
    Payment: {
        Id: string;
        status: string;
        domain: number;
    };
    time: string;
}

@Injectable()
export class PaymentsService {
    constructor(
        private readonly authService: AuthService,
        private readonly http: HttpService,
        private readonly store: Store
    ) {}

    public withDefaultCompany(): PaymentsInvoicesService {
        return this.forCompany(this.store.getDefaultCompany());
    }

    public forCompany(realm: string): PaymentsInvoicesService {
        return new PaymentsInvoicesService(realm, this.authService, this.http);
    }
}

export class PaymentsInvoicesService extends BaseService<QuickBooksPayments, PaymentsQuery, PaymentsQueryResponse> {
    constructor(realm: string, authService: AuthService, http: HttpService) {
        super(realm, "payment", authService, http);
    }

    public create(dto: CreatePaymentsDto): Observable<QuickBooksPayments> {
        return this.post(dto);
    }

    public readById(id: string): Observable<QuickBooksPayments> {
        return this.get(id);
    }

    public getPdf(id: string): Observable<Buffer> {
        return this.get(`${id}/pdf`, null, {
            Accept: "application/pdf"
        });
    }

    public fullUpdate(id: string, token: string, dto: FullUpdatePaymentsDto): Observable<QuickBooksPayments>;
    public fullUpdate(invoice: QuickBooksPayments, dto: FullUpdatePaymentsDto): Observable<QuickBooksPayments>;
    public fullUpdate(
        ...args: [string | QuickBooksPayments, string | FullUpdatePaymentsDto, FullUpdatePaymentsDto?]
    ): Observable<QuickBooksPayments> {
        const [id, token, dto] = PaymentsInvoicesService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token
        });
    }

    public delete(id: string, token: string): Observable<PaymentsDeleteResponse>;
    public delete(invoice: QuickBooksPayments): Observable<PaymentsDeleteResponse>;
    public delete(...args: [string | QuickBooksPayments, string?]): Observable<PaymentsDeleteResponse> {
        const [id, token] = PaymentsInvoicesService.getOperationArguments(args);
        return this.post({
            Id: id,
            SyncToken: token
        }, "", {
            operation: "delete"
        });
    }

    public void(id: string, token: string): Observable<PaymentsDeleteResponse>;
    public void(invoice: QuickBooksPayments): Observable<PaymentsDeleteResponse>;
    public void(...args: [string | QuickBooksPayments, string?]): Observable<PaymentsDeleteResponse> {
        const [id, token] = PaymentsInvoicesService.getOperationArguments(args);
        return this.post({
            Id: id,
            SyncToken: token,
            sparse: true
        }, "", {
            operation: "update",
            include: "void"
        });
    }

    private static getUpdateArguments<DTO>(args: [string | QuickBooksPayments, string | DTO, DTO?]): [string, string, DTO] {
        const [idOrInvoice, tokenOrDto, dto] = args;
        if (dto) {
            return [idOrInvoice as string, tokenOrDto as string, dto];
        }

        const invoice = idOrInvoice as QuickBooksPayments;
        return [invoice.Id, invoice.SyncToken, tokenOrDto as DTO];
    }

    private static getOperationArguments(args: [string | QuickBooksPayments, string?]): [string, string] {
        const [idOrInvoice, token] = args;
        if (token) {
            return [idOrInvoice as string, token];
        }

        const invoice = idOrInvoice as QuickBooksPayments;
        return [invoice.Id, invoice.SyncToken];
    }
}
