import { HttpService, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
import { Store } from "../../store/store";
import { CreateVendorDto, FullUpdateVendorDto, SparseUpdateVendorDto } from "../dto/vendors.dto";
import { VendorsQuery } from "../models/vendors.query";
import { QuickBooksVendors } from "../models/vendors.model";

export interface CustomerQueryResponse {
    QueryResponse: {
        Vendor: QuickBooksVendors[];
        startPosition: number;
        maxResults: number;
    },
    time: string;
}

@Injectable()
export class VendorsService {
    constructor(
        private readonly authService: AuthService,
        private readonly http: HttpService,
        private readonly store: Store
    ) {}

    public withDefaultCompany(): CompanyVendorsService {
        return this.forCompany(this.store.getDefaultCompany());
    }

    public forCompany(realm: string): CompanyVendorsService {
        return new CompanyVendorsService(realm, this.authService, this.http);
    }
}

export class CompanyVendorsService extends BaseService<QuickBooksVendors, VendorsQuery, CustomerQueryResponse> {
    constructor(realm: string, authService: AuthService, http: HttpService) {
        super(realm, "vendor", authService, http);
    }

    public create(dto: CreateVendorDto): Observable<QuickBooksVendors> {
        return this.post(dto);
    }

    public readById(id: string): Observable<QuickBooksVendors> {
        return this.get(id);
    }

    public fullUpdate(id: string, token: string, dto: FullUpdateVendorDto): Observable<QuickBooksVendors>;
    public fullUpdate(customer: QuickBooksVendors, dto: FullUpdateVendorDto): Observable<QuickBooksVendors>;
    public fullUpdate(...args: [string | QuickBooksVendors, string | FullUpdateVendorDto, FullUpdateVendorDto?]): Observable<QuickBooksVendors> {
        const [id, token, dto] = CompanyVendorsService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token
        });
    }

    public sparseUpdate(id: string, token: string, dto: SparseUpdateVendorDto): Observable<QuickBooksVendors>;
    public sparseUpdate(customer: QuickBooksVendors, dto: SparseUpdateVendorDto): Observable<QuickBooksVendors>;
    public sparseUpdate(...args: [string | QuickBooksVendors, string | SparseUpdateVendorDto, SparseUpdateVendorDto?]): Observable<QuickBooksVendors> {
        const [id, token, dto] = CompanyVendorsService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token,
            sparse: true
        });
    }

    private static getUpdateArguments<DTO>(args: [string | QuickBooksVendors, string | DTO, DTO?]): [string, string, DTO] {
        const [idOrVendor, tokenOrDto, dto] = args;
        if (dto) {
            return [idOrVendor as string, tokenOrDto as string, dto];
        }

        const invoice = idOrVendor as QuickBooksVendors;
        return [invoice.Id, invoice.SyncToken, tokenOrDto as DTO];
    }
}
