import { HttpService, Injectable } from "@nestjs/common";
import { BaseService } from "../../common/base.service";
import { AuthService } from "../../auth/services/auth.service";
import { Store } from "../../store/store";
import { QuickBooksCustomers } from "../models/customers.model";
import { CustomerQuery } from "../models/customer.query";

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
}
