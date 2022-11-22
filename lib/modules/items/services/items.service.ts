import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
import { QuickBooksStore } from "../../store";
import {
    CreateQuickBooksItemsDto,
    FullUpdateQuickBooksItemsDto,
    QuickBooksItems,
    QuickBooksItemsQueryModel,
    QuickBooksItemsQueryResponseModel,
    QuickBooksItemsResponseModel, SparseUpdateQuickBooksItemsDto
} from "..";

@Injectable()
export class QuickBooksItemsService {
    constructor(
        private readonly authService: QuickBooksAuthService,
        private readonly http: HttpService,
        private readonly store: QuickBooksStore
    ) {
    }

    public async withDefaultCompany(): Promise<QuickBooksCompanyItemsService> {
        return this.forCompany(await this.store.getDefaultCompany());
    }

    public forCompany(realm: string): QuickBooksCompanyItemsService {
        return new QuickBooksCompanyItemsService(realm, this.authService, this.http);
    }
}

export class QuickBooksCompanyItemsService extends BaseService<
    QuickBooksItemsResponseModel, QuickBooksItemsQueryModel, QuickBooksItemsQueryResponseModel
> {
    constructor(realm: string, authService: QuickBooksAuthService, http: HttpService) {
        super(realm, "item", authService, http);
    }

    public create(dto: CreateQuickBooksItemsDto): Observable<QuickBooksItemsResponseModel> {
        return this.post(dto);
    }

    public readById(id: string): Observable<QuickBooksItemsResponseModel> {
        return this.get(id);
    }

    public fullUpdate(id: string, token: string, dto: FullUpdateQuickBooksItemsDto): Observable<QuickBooksItemsResponseModel>;
    public fullUpdate(item: QuickBooksItems, dto: FullUpdateQuickBooksItemsDto): Observable<QuickBooksItemsResponseModel>;
    public fullUpdate(
        ...args: [string | QuickBooksItems, string | FullUpdateQuickBooksItemsDto, FullUpdateQuickBooksItemsDto?]
    ): Observable<QuickBooksItemsResponseModel> {
        const [id, token, dto] = QuickBooksCompanyItemsService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token
        });
    }

    public sparseUpdate(id: string, token: string, dto: SparseUpdateQuickBooksItemsDto): Observable<QuickBooksItemsResponseModel>;
    public sparseUpdate(item: QuickBooksItems, dto: SparseUpdateQuickBooksItemsDto): Observable<QuickBooksItemsResponseModel>;
    public sparseUpdate(
        ...args: [string | QuickBooksItems, string | SparseUpdateQuickBooksItemsDto, SparseUpdateQuickBooksItemsDto?]
    ): Observable<QuickBooksItemsResponseModel> {
        const [id, token, dto] = QuickBooksCompanyItemsService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token,
            sparse: true
        });
    }

    private static getUpdateArguments<DTO>(args: [string | QuickBooksItems, string | DTO, DTO?]): [string, string, DTO] {
        const [idOrItem, tokenOrDto, dto] = args;
        if (dto) {
            return [idOrItem as string, tokenOrDto as string, dto];
        }

        const item = idOrItem as QuickBooksItems;
        return [item.Id, item.SyncToken, tokenOrDto as DTO];
    }
}
