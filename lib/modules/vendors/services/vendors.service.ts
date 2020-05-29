import { HttpService, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
import { QuickBooksStore } from "../../store/store.service";
import { CreateQuickBooksVendorDto, FullUpdateQuickBooksVendorDto } from "../dto/vendors.dto";
import { QuickBooksVendorsQuery, QuickBooksVendorsQueryResponse } from "../models/vendors.query";
import { QuickBooksVendors } from "../models/vendors.model";

@Injectable()
export class QuickBooksVendorsService {
    constructor(
        private readonly authService: QuickBooksAuthService,
        private readonly http: HttpService,
        private readonly store: QuickBooksStore
    ) {}

    public async withDefaultCompany(): Promise<CompanyVendorsService> {
        return this.forCompany(await this.store.getDefaultCompany());
    }

    public forCompany(realm: string): CompanyVendorsService {
        return new CompanyVendorsService(realm, this.authService, this.http);
    }
}

class CompanyVendorsService extends BaseService<QuickBooksVendors, QuickBooksVendorsQuery, QuickBooksVendorsQueryResponse> {
    constructor(realm: string, authService: QuickBooksAuthService, http: HttpService) {
        super(realm, "vendor", authService, http);
    }

    public create(dto: CreateQuickBooksVendorDto): Observable<QuickBooksVendors> {
        return this.post(dto);
    }

    public readById(id: string): Observable<QuickBooksVendors> {
        return this.get(id);
    }

    public fullUpdate(id: string, token: string, dto: FullUpdateQuickBooksVendorDto): Observable<QuickBooksVendors>;
    public fullUpdate(vendor: QuickBooksVendors, dto: FullUpdateQuickBooksVendorDto): Observable<QuickBooksVendors>;
    public fullUpdate(
        ...args: [string | QuickBooksVendors, string | FullUpdateQuickBooksVendorDto, FullUpdateQuickBooksVendorDto?]
    ): Observable<QuickBooksVendors> {
        const [id, token, dto] = CompanyVendorsService.getUpdateArguments(args);
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
