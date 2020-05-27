import { HttpService, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
import { QuickBooksStore } from "../../store/store.service";
import { CreateQuickBooksCustomersDto, FullQuickBooksUpdateCustomersDto, SparseQuickBooksUpdateCustomersDto } from "../dto/customers.dto";
import { QuickBooksCustomersQuery } from "../models/customers.query";
import { QuickBooksCustomers } from "../models/customers.model";

export interface QuickBooksCustomerQueryResponse {
    QueryResponse: {
        Customer: QuickBooksCustomers[];
        startPosition: number;
        maxResults: number;
    };
    time: string;
}

@Injectable()
export class QuickBooksCustomersService {
    constructor(
        private readonly authService: QuickBooksAuthService,
        private readonly http: HttpService,
        private readonly store: QuickBooksStore
    ) {}

    public async withDefaultCompany(): Promise<CompanyCustomersService> {
        return this.forCompany(await this.store.getDefaultCompany());
    }

    public forCompany(realm: string): CompanyCustomersService {
        return new CompanyCustomersService(realm, this.authService, this.http);
    }
}

class CompanyCustomersService extends BaseService<QuickBooksCustomers, QuickBooksCustomersQuery, QuickBooksCustomerQueryResponse> {
    constructor(realm: string, authService: QuickBooksAuthService, http: HttpService) {
        super(realm, "customer", authService, http);
    }

    public create(dto: CreateQuickBooksCustomersDto): Observable<QuickBooksCustomers> {
        return this.post(dto);
    }

    public readById(id: string): Observable<QuickBooksCustomers> {
        return this.get(id);
    }

    public fullUpdate(id: string, token: string, dto: FullQuickBooksUpdateCustomersDto): Observable<QuickBooksCustomers>;
    public fullUpdate(customer: QuickBooksCustomers, dto: FullQuickBooksUpdateCustomersDto): Observable<QuickBooksCustomers>;
    public fullUpdate(
        ...args: [string | QuickBooksCustomers, string | FullQuickBooksUpdateCustomersDto, FullQuickBooksUpdateCustomersDto?]
    ): Observable<QuickBooksCustomers> {
        const [id, token, dto] = CompanyCustomersService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token
        });
    }

    public sparseUpdate(id: string, token: string, dto: SparseQuickBooksUpdateCustomersDto): Observable<QuickBooksCustomers>;
    public sparseUpdate(customer: QuickBooksCustomers, dto: SparseQuickBooksUpdateCustomersDto): Observable<QuickBooksCustomers>;
    public sparseUpdate(
        ...args: [string | QuickBooksCustomers, string | SparseQuickBooksUpdateCustomersDto, SparseQuickBooksUpdateCustomersDto?]
    ): Observable<QuickBooksCustomers> {
        const [id, token, dto] = CompanyCustomersService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token,
            sparse: true
        });
    }

    private static getUpdateArguments<DTO>(args: [string | QuickBooksCustomers, string | DTO, DTO?]): [string, string, DTO] {
        const [idOrCustomer, tokenOrDto, dto] = args;
        if (dto) {
            return [idOrCustomer as string, tokenOrDto as string, dto];
        }

        const invoice = idOrCustomer as QuickBooksCustomers;
        return [invoice.Id, invoice.SyncToken, tokenOrDto as DTO];
    }
}
