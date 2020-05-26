import { HttpService, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
import { Store } from "../../store/store";
import { CreateCustomerDto, FullUpdateCustomerDto, SparseUpdateCustomerDto } from "../dto/customers.dto";
import { CustomerQuery } from "../models/customer.query";
import { QuickBooksCustomers } from "../models/customers.model";
import { QuickBooksInvoices } from "../../invoices/models/invoices.model";
import { SparseUpdateInvoicesDto } from "../../invoices/dto/invoices.dto";

export interface CustomerQueryResponse {
    QueryResponse: {
        Customer: QuickBooksCustomers[];
        startPosition: number;
        maxResults: number;
    },
    time: string;
}

@Injectable()
export class CustomersService {
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

export class CompanyCustomersService extends BaseService<QuickBooksCustomers, CustomerQuery, CustomerQueryResponse> {
    constructor(realm: string, authService: AuthService, http: HttpService) {
        super(realm, "customer", authService, http);
    }

    public create(dto: CreateCustomerDto): Observable<QuickBooksCustomers> {
        return this.post(dto);
    }

    public readById(id: string): Observable<QuickBooksCustomers> {
        return this.get(id);
    }

    public fullUpdate(id: string, token: string, dto: FullUpdateCustomerDto): Observable<QuickBooksCustomers>;
    public fullUpdate(customer: QuickBooksCustomers, dto: FullUpdateCustomerDto): Observable<QuickBooksCustomers>;
    public fullUpdate(...args: [string | QuickBooksCustomers, string | FullUpdateCustomerDto, FullUpdateCustomerDto?]): Observable<QuickBooksCustomers> {
        const [id, token, dto] = CompanyCustomersService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token
        });
    }

    public sparseUpdate(id: string, token: string, dto: SparseUpdateCustomerDto): Observable<QuickBooksCustomers>;
    public sparseUpdate(customer: QuickBooksCustomers, dto: SparseUpdateCustomerDto): Observable<QuickBooksCustomers>;
    public sparseUpdate(...args: [string | QuickBooksCustomers, string | SparseUpdateCustomerDto, SparseUpdateCustomerDto?]): Observable<QuickBooksCustomers> {
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
