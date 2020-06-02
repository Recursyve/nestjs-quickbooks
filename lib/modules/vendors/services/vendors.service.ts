import { HttpService, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
import { QuickBooksStore } from "../../store";
import {
    CreateQuickBooksVendorsDto,
    FullUpdateQuickBooksVendorsDto,
    QuickBooksVendors,
    QuickBooksVendorsQueryModel,
    QuickBooksVendorsQueryResponseModel,
    QuickBooksVendorsResponseModel
} from "..";

@Injectable()
export class QuickBooksVendorsService {
    constructor(
        private readonly authService: QuickBooksAuthService,
        private readonly http: HttpService,
        private readonly store: QuickBooksStore
    ) {
    }

    public async withDefaultCompany(): Promise<QuickBooksCompanyVendorsService> {
        return this.forCompany(await this.store.getDefaultCompany());
    }

    public forCompany(realm: string): QuickBooksCompanyVendorsService {
        return new QuickBooksCompanyVendorsService(realm, this.authService, this.http);
    }
}

export class QuickBooksCompanyVendorsService extends BaseService<
    QuickBooksVendorsResponseModel, QuickBooksVendorsQueryModel, QuickBooksVendorsQueryResponseModel
> {
    constructor(realm: string, authService: QuickBooksAuthService, http: HttpService) {
        super(realm, "vendor", authService, http);
    }

    public create(dto: CreateQuickBooksVendorsDto): Observable<QuickBooksVendorsResponseModel> {
        return this.post(dto);
    }

    public readById(id: string): Observable<QuickBooksVendorsResponseModel> {
        return this.get(id);
    }

    public fullUpdate(id: string, token: string, dto: FullUpdateQuickBooksVendorsDto): Observable<QuickBooksVendorsResponseModel>;
    public fullUpdate(vendor: QuickBooksVendors, dto: FullUpdateQuickBooksVendorsDto): Observable<QuickBooksVendorsResponseModel>;
    public fullUpdate(
        ...args: [string | QuickBooksVendors, string | FullUpdateQuickBooksVendorsDto, FullUpdateQuickBooksVendorsDto?]
    ): Observable<QuickBooksVendorsResponseModel> {
        const [id, token, dto] = QuickBooksCompanyVendorsService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token
        });
    }

    private static getUpdateArguments<DTO>(args: [string | QuickBooksVendors, string | DTO, DTO?]): [string, string, DTO] {
        const [idOrVendor, tokenOrDto, dto] = args;
        if (dto) {
            return [idOrVendor as string, tokenOrDto as string, dto];
        }

        const vendor = idOrVendor as QuickBooksVendors;
        return [vendor.Id, vendor.SyncToken, tokenOrDto as DTO];
    }
}
