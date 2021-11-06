import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
import { QuickBooksStore } from "../../store";
import {
    QuickBooksBillsDeleteResponseModel,
    QuickBooksBillsQueryResponseModel,
    QuickBooksBillsResponseModel
} from "../models/bills-response.model";
import { QuickBooksBillsQueryModel } from "../models/bills-query.model";
import { QuickBooksBills } from "../models/bills.model";
import { CreateQuickBooksBillsDto, FullUpdateQuickBooksBillsDto } from "../dto/bills.dto";

@Injectable()
export class QuickBooksBillsService {
    constructor(
        private readonly authService: QuickBooksAuthService,
        private readonly http: HttpService,
        private readonly store: QuickBooksStore
    ) {
    }

    public async withDefaultCompany(): Promise<QuickBooksCompanyBillsService> {
        return this.forCompany(await this.store.getDefaultCompany());
    }

    public forCompany(realm: string): QuickBooksCompanyBillsService {
        return new QuickBooksCompanyBillsService(realm, this.authService, this.http);
    }
}

export class QuickBooksCompanyBillsService extends BaseService<
    QuickBooksBillsResponseModel, QuickBooksBillsQueryModel, QuickBooksBillsQueryResponseModel
> {
    constructor(realm: string, authService: QuickBooksAuthService, http: HttpService) {
        super(realm, "bill", authService, http);
    }

    public create(dto: CreateQuickBooksBillsDto): Observable<QuickBooksBillsResponseModel> {
        return this.post(dto);
    }

    public readById(id: string): Observable<QuickBooksBillsResponseModel> {
        return this.get(id);
    }

    public fullUpdate(id: string, token: string, dto: FullUpdateQuickBooksBillsDto): Observable<QuickBooksBillsResponseModel>;
    public fullUpdate(bill: QuickBooksBills, dto: FullUpdateQuickBooksBillsDto): Observable<QuickBooksBillsResponseModel>;
    public fullUpdate(
        ...args: [string | QuickBooksBills, string | FullUpdateQuickBooksBillsDto, FullUpdateQuickBooksBillsDto?]
    ): Observable<QuickBooksBillsResponseModel> {
        const [id, token, dto] = QuickBooksCompanyBillsService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token
        });
    }

    public delete(id: string, token: string): Observable<QuickBooksBillsDeleteResponseModel>;
    public delete(bill: QuickBooksBills): Observable<QuickBooksBillsDeleteResponseModel>;
    public delete(...args: [string | QuickBooksBills, string?]): Observable<QuickBooksBillsDeleteResponseModel> {
        const [id, token] = QuickBooksCompanyBillsService.getOperationArguments(args);
        return this.post({
            Id: id,
            SyncToken: token
        }, "", {
            operation: "delete"
        });
    }

    private static getUpdateArguments<DTO>(args: [string | QuickBooksBills, string | DTO, DTO?]): [string, string, DTO] {
        const [idOrBill, tokenOrDto, dto] = args;
        if (dto) {
            return [idOrBill as string, tokenOrDto as string, dto];
        }

        const bill = idOrBill as QuickBooksBills;
        return [bill.Id, bill.SyncToken, tokenOrDto as DTO];
    }

    private static getOperationArguments(args: [string | QuickBooksBills, string?]): [string, string] {
        const [idOrBill, token] = args;
        if (token) {
            return [idOrBill as string, token];
        }

        const bill = idOrBill as QuickBooksBills;
        return [bill.Id, bill.SyncToken];
    }
}
