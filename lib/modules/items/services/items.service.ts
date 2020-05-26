import { HttpService, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
import { Store } from "../../store/store";
import { QuickBooksItems } from "../models/items.model";
import { ItemsQuery } from "../models/items.query";
import { CreateItemDto, FullUpdateItemDto } from "../dto/items.dto";

export interface ItemQueryResponse {
    QueryResponse: {
        Item: QuickBooksItems[];
        startPosition: number;
        maxResults: number;
    };
    time: string;
}

@Injectable()
export class ItemsService {
    constructor(
        private readonly authService: AuthService,
        private readonly http: HttpService,
        private readonly store: Store
    ) {}

    public withDefaultCompany(): CompanyCustomersService {
        return this.forCompany(this.store.getDefaultCompany());
    }

    public forCompany(realm: string): CompanyCustomersService {
        return new CompanyCustomersService(realm, this.authService, this.http);
    }
}

export class CompanyCustomersService extends BaseService<QuickBooksItems, ItemsQuery, ItemQueryResponse> {
    constructor(realm: string, authService: AuthService, http: HttpService) {
        super(realm, "item", authService, http);
    }

    public create(dto: CreateItemDto): Observable<QuickBooksItems> {
        return this.post(dto);
    }

    public readById(id: string): Observable<QuickBooksItems> {
        return this.get(id);
    }

    public fullUpdate(id: string, token: string, dto: FullUpdateItemDto): Observable<QuickBooksItems>;
    public fullUpdate(customer: QuickBooksItems, dto: FullUpdateItemDto): Observable<QuickBooksItems>;
    public fullUpdate(
        ...args: [string | QuickBooksItems, string | FullUpdateItemDto, FullUpdateItemDto?]
    ): Observable<QuickBooksItems> {
        const [id, token, dto] = CompanyCustomersService.getUpdateArguments(args);
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

        const invoice = idOrItem as QuickBooksItems;
        return [invoice.Id, invoice.SyncToken, tokenOrDto as DTO];
    }
}
