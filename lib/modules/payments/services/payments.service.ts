import { HttpService, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
import { QuickBooksStore } from "../../store/store.service";
import { QuickBooksPayments } from "../models/payments.model";
import { QuickBooksPaymentsQuery } from "../models/payments.query";
import { CreateQuickBooksPaymentsDto, FullUpdateQuickBooksPaymentsDto } from "../dto/payments.dto";
import { QuickBooksResponseModel } from "../../common/models";

export interface QuickBooksPaymentsQueryResponse extends QuickBooksResponseModel {
    QueryResponse: {
        Invoice: QuickBooksPayments[];
        startPosition: number;
        maxResults: number;
    };
}

export interface QuickBooksPaymentsDeleteResponse extends QuickBooksResponseModel {
    Payment: {
        Id: string;
        status: string;
        domain: number;
    };
}

@Injectable()
export class QuickBooksPaymentsService {
    constructor(
        private readonly authService: QuickBooksAuthService,
        private readonly http: HttpService,
        private readonly store: QuickBooksStore
    ) {}

    public async withDefaultCompany(): Promise<CompanyPaymentsService> {
        return this.forCompany(await this.store.getDefaultCompany());
    }

    public forCompany(realm: string): CompanyPaymentsService {
        return new CompanyPaymentsService(realm, this.authService, this.http);
    }
}

class CompanyPaymentsService extends BaseService<QuickBooksPayments, QuickBooksPaymentsQuery, QuickBooksPaymentsQueryResponse> {
    constructor(realm: string, authService: QuickBooksAuthService, http: HttpService) {
        super(realm, "payment", authService, http);
    }

    public create(dto: CreateQuickBooksPaymentsDto): Observable<QuickBooksPayments> {
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

    public fullUpdate(id: string, token: string, dto: FullUpdateQuickBooksPaymentsDto): Observable<QuickBooksPayments>;
    public fullUpdate(invoice: QuickBooksPayments, dto: FullUpdateQuickBooksPaymentsDto): Observable<QuickBooksPayments>;
    public fullUpdate(
        ...args: [string | QuickBooksPayments, string | FullUpdateQuickBooksPaymentsDto, FullUpdateQuickBooksPaymentsDto?]
    ): Observable<QuickBooksPayments> {
        const [id, token, dto] = CompanyPaymentsService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token
        });
    }

    public delete(id: string, token: string): Observable<QuickBooksPaymentsDeleteResponse>;
    public delete(invoice: QuickBooksPayments): Observable<QuickBooksPaymentsDeleteResponse>;
    public delete(...args: [string | QuickBooksPayments, string?]): Observable<QuickBooksPaymentsDeleteResponse> {
        const [id, token] = CompanyPaymentsService.getOperationArguments(args);
        return this.post({
            Id: id,
            SyncToken: token
        }, "", {
            operation: "delete"
        });
    }

    public void(id: string, token: string): Observable<QuickBooksPaymentsDeleteResponse>;
    public void(invoice: QuickBooksPayments): Observable<QuickBooksPaymentsDeleteResponse>;
    public void(...args: [string | QuickBooksPayments, string?]): Observable<QuickBooksPaymentsDeleteResponse> {
        const [id, token] = CompanyPaymentsService.getOperationArguments(args);
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
        const [idOrPayment, tokenOrDto, dto] = args;
        if (dto) {
            return [idOrPayment as string, tokenOrDto as string, dto];
        }

        const payment = idOrPayment as QuickBooksPayments;
        return [payment.Id, payment.SyncToken, tokenOrDto as DTO];
    }

    private static getOperationArguments(args: [string | QuickBooksPayments, string?]): [string, string] {
        const [idOrPayment, token] = args;
        if (token) {
            return [idOrPayment as string, token];
        }

        const payment = idOrPayment as QuickBooksPayments;
        return [payment.Id, payment.SyncToken];
    }
}
