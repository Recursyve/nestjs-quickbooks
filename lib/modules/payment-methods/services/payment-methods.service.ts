import { HttpService, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
import { QuickBooksStore } from "../../store";
import {
    QuickBooksPaymentMethodsQueryResponseModel,
    QuickBooksPaymentMethodsResponseModel
} from "../models/payment-methods-response.model";
import { QuickBooksPaymentMethodsQueryModel } from "../models/payment-methods-query.model";
import { CreateQuickBooksPaymentMethodsDto, FullUpdateQuickBooksPaymentMethodsDto } from "../dto/payment-methods.dto";
import { QuickBooksPaymentMethods } from "../models/payment-methods.model";

@Injectable()
export class QuickBooksPaymentMethodsService {
    constructor(
        private readonly authService: QuickBooksAuthService,
        private readonly http: HttpService,
        private readonly store: QuickBooksStore
    ) {
    }

    public async withDefaultCompany(): Promise<QuickBooksCompanyPaymentMethodsService> {
        return this.forCompany(await this.store.getDefaultCompany());
    }

    public forCompany(realm: string): QuickBooksCompanyPaymentMethodsService {
        return new QuickBooksCompanyPaymentMethodsService(realm, this.authService, this.http);
    }
}

export class QuickBooksCompanyPaymentMethodsService extends BaseService<
    QuickBooksPaymentMethodsResponseModel,
    QuickBooksPaymentMethodsQueryModel,
    QuickBooksPaymentMethodsQueryResponseModel
> {
    constructor(realm: string, authService: QuickBooksAuthService, http: HttpService) {
        super(realm, "paymentmethod", authService, http);
    }

    public create(dto: CreateQuickBooksPaymentMethodsDto): Observable<QuickBooksPaymentMethodsResponseModel> {
        return this.post(dto);
    }

    public readById(id: string): Observable<QuickBooksPaymentMethodsResponseModel> {
        return this.get(id);
    }

    public fullUpdate(id: string, token: string, dto: FullUpdateQuickBooksPaymentMethodsDto): Observable<QuickBooksPaymentMethodsResponseModel>;
    public fullUpdate(
        paymentMethod: QuickBooksPaymentMethods, dto: FullUpdateQuickBooksPaymentMethodsDto
    ): Observable<QuickBooksPaymentMethodsResponseModel>;
    public fullUpdate(
        ...args: [string | QuickBooksPaymentMethods, string | FullUpdateQuickBooksPaymentMethodsDto, FullUpdateQuickBooksPaymentMethodsDto?]
    ): Observable<QuickBooksPaymentMethodsResponseModel> {
        const [id, token, dto] = QuickBooksCompanyPaymentMethodsService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token
        });
    }

    private static getUpdateArguments<DTO>(args: [string | QuickBooksPaymentMethods, string | DTO, DTO?]): [string, string, DTO] {
        const [idOrPaymentMethod, tokenOrDto, dto] = args;
        if (dto) {
            return [idOrPaymentMethod as string, tokenOrDto as string, dto];
        }

        const paymentMethod = idOrPaymentMethod as QuickBooksPaymentMethods;
        return [paymentMethod.Id, paymentMethod.SyncToken, tokenOrDto as DTO];
    }
}
