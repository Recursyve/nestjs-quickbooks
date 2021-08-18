import { HttpService, Injectable } from "@nestjs/common";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { QuickBooksStore } from "../../store";
import { BaseService } from "../../common/base.service";
import { QuickBooksCustomers, QuickBooksCustomersQuery, QuickBooksCustomersQueryResponseModel } from "../../customers";
import {QuickBooksAccountsQueryResponseModel, QuickBooksAccountsResponseModel} from "../models/accounts-response.model";
import {QuickBooksAccountsQueryModel} from "../models/accounts-query.model";
import {CreateQuickBooksAccountsDto} from "../dto/accounts.dto";
import {Observable} from "rxjs";

@Injectable()
export class QuickBooksAccountsService {
    constructor(
        private readonly authService: QuickBooksAuthService,
        private readonly http: HttpService,
        private readonly store: QuickBooksStore
    ) {
    }

    public async withDefaultCompany(): Promise<QuickBooksCompanyAccountsService> {
        return this.forCompany(await this.store.getDefaultCompany());
    }

    public forCompany(realm: string): QuickBooksCompanyAccountsService {
        return new QuickBooksCompanyAccountsService(realm, this.authService, this.http);
    }

}

export class QuickBooksCompanyAccountsService extends BaseService<
    QuickBooksAccountsResponseModel,
    QuickBooksAccountsQueryModel,
    QuickBooksAccountsQueryResponseModel
    > {

    constructor(realm: string, authService: QuickBooksAuthService, http: HttpService) {
        super(realm, "bill", authService, http);
    }

    public create(dto: CreateQuickBooksAccountsDto): Observable<QuickBooksAccountsResponseModel> {
        return this.post(dto);
    }



}
