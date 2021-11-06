import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
import { QuickBooksStore } from "../../store";
import {
    QuickBooksTaxCodes,
    QuickBooksTaxCodesQuery,
    QuickBooksTaxCodesQueryResponseModel,
    QuickBooksTaxCodesResponseModel,
} from "..";

@Injectable()
export class QuickBooksTaxCodesService {
    constructor(
        private readonly authService: QuickBooksAuthService,
        private readonly http: HttpService,
        private readonly store: QuickBooksStore
    ) {
    }

    public async withDefaultCompany(): Promise<QuickBooksCompanyTaxCodesService> {
        return this.forCompany(await this.store.getDefaultCompany());
    }

    public forCompany(realm: string): QuickBooksCompanyTaxCodesService {
        return new QuickBooksCompanyTaxCodesService(realm, this.authService, this.http);
    }
}

export class QuickBooksCompanyTaxCodesService extends BaseService<QuickBooksTaxCodes,
    QuickBooksTaxCodesQuery,
    QuickBooksTaxCodesQueryResponseModel> {
    constructor(realm: string, authService: QuickBooksAuthService, http: HttpService) {
        super(realm, "taxcode", authService, http);
    }

    public readById(id: string): Observable<QuickBooksTaxCodesResponseModel> {
        return this.get(id);
    }
}
