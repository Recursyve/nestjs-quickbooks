import { HttpService, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
import { QuickBooksStore } from "../../store/store.service";
import { QuickBooksItems } from "../models/items.model";
import { QuickBooksItemsQuery } from "../models/items.query";
import { CreateQuickBooksItemDto, FullUpdateQuickBooksItemDto } from "../dto/items.dto";
import { QuickBooksResponseModel } from "../../common/models";

export interface QuickBooksItemQueryResponse extends QuickBooksResponseModel {
    QueryResponse: {
        Item: QuickBooksItems[];
        startPosition: number;
        maxResults: number;
    };
}

@Injectable()
export class QuickBooksItemsService {
    constructor(
        private readonly authService: QuickBooksAuthService,
        private readonly http: HttpService,
        private readonly store: QuickBooksStore
    ) {}

    public async withDefaultCompany(): Promise<CompanyItemsService> {
        return this.forCompany(await this.store.getDefaultCompany());
    }

    public forCompany(realm: string): CompanyItemsService {
        return new CompanyItemsService(realm, this.authService, this.http);
    }
}

class CompanyItemsService extends BaseService<QuickBooksItems, QuickBooksItemsQuery, QuickBooksItemQueryResponse> {
    constructor(realm: string, authService: QuickBooksAuthService, http: HttpService) {
        super(realm, "item", authService, http);
    }

    public create(dto: CreateQuickBooksItemDto): Observable<QuickBooksItems> {
        return this.post(dto);
    }

    public readById(id: string): Observable<QuickBooksItems> {
        return this.get(id);
    }

    public fullUpdate(id: string, token: string, dto: FullUpdateQuickBooksItemDto): Observable<QuickBooksItems>;
    public fullUpdate(customer: QuickBooksItems, dto: FullUpdateQuickBooksItemDto): Observable<QuickBooksItems>;
    public fullUpdate(
        ...args: [string | QuickBooksItems, string | FullUpdateQuickBooksItemDto, FullUpdateQuickBooksItemDto?]
    ): Observable<QuickBooksItems> {
        const [id, token, dto] = CompanyItemsService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token
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
