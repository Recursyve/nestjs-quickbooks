import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
import { QuickBooksStore } from "../../store";
import {
    CreateQuickBooksPaymentsDto,
    FullUpdateQuickBooksPaymentsDto,
    QuickBooksPayments, QuickBooksPaymentsDeleteResponseModel,
    QuickBooksPaymentsQueryModel,
    QuickBooksPaymentsQueryResponseModel,
    QuickBooksPaymentsResponseModel
} from "..";

@Injectable()
export class QuickBooksPaymentsService {
    constructor(
        private readonly authService: QuickBooksAuthService,
        private readonly http: HttpService,
        private readonly store: QuickBooksStore
    ) {
    }

    public async withDefaultCompany(): Promise<QuickBooksCompanyPaymentsService> {
        return this.forCompany(await this.store.getDefaultCompany());
    }

    public forCompany(realm: string): QuickBooksCompanyPaymentsService {
        return new QuickBooksCompanyPaymentsService(realm, this.authService, this.http);
    }
}

export class QuickBooksCompanyPaymentsService extends BaseService<
    QuickBooksPaymentsResponseModel, QuickBooksPaymentsQueryModel, QuickBooksPaymentsQueryResponseModel
> {
    constructor(realm: string, authService: QuickBooksAuthService, http: HttpService) {
        super(realm, "payment", authService, http);
    }

    public create(dto: CreateQuickBooksPaymentsDto): Observable<QuickBooksPaymentsResponseModel> {
        return this.post(dto);
    }

    public readById(id: string): Observable<QuickBooksPaymentsResponseModel> {
        return this.get(id);
    }

    public getPdf(id: string): Observable<Buffer> {
        return this.get(`${id}/pdf`, null, {
            Accept: "application/pdf"
        });
    }

    public fullUpdate(id: string, token: string, dto: FullUpdateQuickBooksPaymentsDto): Observable<QuickBooksPaymentsResponseModel>;
    public fullUpdate(invoice: QuickBooksPayments, dto: FullUpdateQuickBooksPaymentsDto): Observable<QuickBooksPaymentsResponseModel>;
    public fullUpdate(
        ...args: [string | QuickBooksPayments, string | FullUpdateQuickBooksPaymentsDto, FullUpdateQuickBooksPaymentsDto?]
    ): Observable<QuickBooksPaymentsResponseModel> {
        const [id, token, dto] = QuickBooksCompanyPaymentsService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token
        });
    }

    public delete(id: string, token: string): Observable<QuickBooksPaymentsDeleteResponseModel>;
    public delete(invoice: QuickBooksPayments): Observable<QuickBooksPaymentsDeleteResponseModel>;
    public delete(...args: [string | QuickBooksPayments, string?]): Observable<QuickBooksPaymentsDeleteResponseModel> {
        const [id, token] = QuickBooksCompanyPaymentsService.getOperationArguments(args);
        return this.post({
            Id: id,
            SyncToken: token
        }, "", {
            operation: "delete"
        });
    }

    public void(id: string, token: string): Observable<QuickBooksPaymentsResponseModel>;
    public void(invoice: QuickBooksPayments): Observable<QuickBooksPaymentsResponseModel>;
    public void(...args: [string | QuickBooksPayments, string?]): Observable<QuickBooksPaymentsResponseModel> {
        const [id, token] = QuickBooksCompanyPaymentsService.getOperationArguments(args);
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
