import { HttpService, Injectable } from "@nestjs/common";
import { BaseService } from "../../common/base.service";
import { Observable } from "rxjs";
import { AuthService } from "../../auth/services/auth.service";
import { Store } from "../../store/store";

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

export class CompanyCustomersService extends BaseService {
    constructor(realm: string, authService: AuthService, http: HttpService) {
        super(realm, "customer", authService, http);
    }

    public getAll(): Observable<any> {
        return this.query<any>("select * from Customer Where Metadata.LastUpdatedTime > '2015-03-01'");
    }
}
