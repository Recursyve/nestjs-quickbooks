import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
import { QuickBooksStore } from "../../store";
import {
    QuickBooksExchangeRates,
    QuickBooksExchangeRatesQuery,
    QuickBooksExchangeRatesResponseModel,
    QuickBooksExchangeRatesQueryResponseModel
} from "..";

@Injectable()
export class QuickBooksExchangeRatesService {
    constructor(
        private readonly authService: QuickBooksAuthService,
        private readonly http: HttpService,
        private readonly store: QuickBooksStore
    ) {
    }

    public async withDefaultCompany(): Promise<QuickBooksCompanyExchangeRatesService> {
        return this.forCompany(await this.store.getDefaultCompany());
    }

    public forCompany(realm: string): QuickBooksCompanyExchangeRatesService {
        return new QuickBooksCompanyExchangeRatesService(realm, this.authService, this.http);
    }
}

export class QuickBooksCompanyExchangeRatesService extends BaseService<QuickBooksExchangeRates,
    QuickBooksExchangeRatesQuery,
    QuickBooksExchangeRatesQueryResponseModel> {
    constructor(realm: string, authService: QuickBooksAuthService, http: HttpService) {
        super(realm, "exchangerate", authService, http);
    }
}
