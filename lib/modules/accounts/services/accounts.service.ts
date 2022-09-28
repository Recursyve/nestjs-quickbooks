import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { QuickBooksStore } from "../../store";
import { BaseService } from "../../common/base.service";
import { QuickBooksAccountsDeleteResponseModel, QuickBooksAccountsQueryResponseModel, QuickBooksAccountsResponseModel } from "../models/accounts-response.model";
import { QuickBooksAccountsQueryModel } from "../models/accounts-query.model";
import { CreateQuickBooksAccountsDto, FullUpdateQuickBooksAccountsDto, SparseUpdateQuickBooksAccountsDto } from "../dto/accounts.dto";
import { Observable } from "rxjs";
import { QuickBooksAccounts } from "../models/accounts.model";

@Injectable()
export class QuickBooksAccountsService {
    constructor(
        private readonly authService: QuickBooksAuthService,
        private readonly http: HttpService,
        private readonly store: QuickBooksStore
    ) {
    }

    public async withDefaultCompany(): Promise<QuickBooksCompanyAccountsService> {
        return this.forCompany(await this.store.getDefaultCompany());
    }

    public forCompany(realm: string): QuickBooksCompanyAccountsService {
        return new QuickBooksCompanyAccountsService(realm, this.authService, this.http);
    }
}

export class QuickBooksCompanyAccountsService extends BaseService<QuickBooksAccountsResponseModel,
    QuickBooksAccountsQueryModel,
    QuickBooksAccountsQueryResponseModel> {

    constructor(realm: string, authService: QuickBooksAuthService, http: HttpService) {
        super(realm, "account", authService, http);
    }

    public create(dto: CreateQuickBooksAccountsDto): Observable<QuickBooksAccountsResponseModel> {
        return this.post(dto);
    }

    public readById(id: string): Observable<QuickBooksAccountsResponseModel> {
        return this.get(id);
    }

    public fullUpdate(id: string, token: string, dto: FullUpdateQuickBooksAccountsDto): Observable<QuickBooksAccountsResponseModel>;
    public fullUpdate(account: QuickBooksAccounts, dto: FullUpdateQuickBooksAccountsDto): Observable<QuickBooksAccountsResponseModel>;
    public fullUpdate(
        ...args: [string | QuickBooksAccounts, string | FullUpdateQuickBooksAccountsDto, FullUpdateQuickBooksAccountsDto?]
    ): Observable<QuickBooksAccountsResponseModel> {
        const [id, token, dto] = QuickBooksCompanyAccountsService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token
        });
    }

    public sparseUpdate(id: string, token: string, dto: SparseUpdateQuickBooksAccountsDto): Observable<QuickBooksAccountsResponseModel>;
    public sparseUpdate(account: QuickBooksAccounts, dto: SparseUpdateQuickBooksAccountsDto): Observable<QuickBooksAccountsResponseModel>;
    public sparseUpdate(
        ...args: [string | QuickBooksAccounts, string | SparseUpdateQuickBooksAccountsDto, SparseUpdateQuickBooksAccountsDto?]
    ): Observable<QuickBooksAccountsResponseModel> {
        const [id, token, dto] = QuickBooksCompanyAccountsService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token,
            sparse: true
        });
    }

    public delete(id: string, token: string): Observable<QuickBooksAccountsDeleteResponseModel>;
    public delete(account: QuickBooksAccounts): Observable<QuickBooksAccountsDeleteResponseModel>;
    public delete(...args: [string | QuickBooksAccounts, string?]): Observable<QuickBooksAccountsDeleteResponseModel> {
        const [id, token] = QuickBooksCompanyAccountsService.getOperationArguments(args);
        return this.post({
            Id: id,
            SyncToken: token
        }, "", {
            operation: "delete"
        });
    }

    private static getUpdateArguments<DTO>(args: [string | QuickBooksAccounts, string | DTO, DTO?]): [string, string, DTO] {
        const [idOrAccount, tokenOrDto, dto] = args;
        if (dto) {
            return [idOrAccount as string, tokenOrDto as string, dto];
        }

        const account = idOrAccount as QuickBooksAccounts;
        return [account.Id, account.SyncToken, tokenOrDto as DTO];
    }

    private static getOperationArguments(args: [string | QuickBooksAccounts, string?]): [string, string] {
        const [idOrAccount, token] = args;
        if (token) {
            return [idOrAccount as string, token];
        }

        const account = idOrAccount as QuickBooksAccounts;
        return [account.Id, account.SyncToken];
    }
}
