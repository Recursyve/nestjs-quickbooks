import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
import { QuickBooksStore } from "../../store";
import { QuickBooksTermsQueryResponseModel, QuickBooksTermsResponseModel } from "../models/terms-response.model";
import { QuickBooksTermsQuery } from "../models/terms-query.model";
import { HttpService } from "@nestjs/axios";
import { QuickBooksTerms } from "../models/terms.model";
import { CreateQuickBooksTermsDto } from "../dto/terms.dto";

@Injectable()
export class QuickBooksTermsService {
    constructor(
        private readonly authService: QuickBooksAuthService,
        private readonly http: HttpService,
        private readonly store: QuickBooksStore
    ) {
    }

    public async withDefaultCompany(): Promise<QuickBooksCompanyTermsService> {
        return this.forCompany(await this.store.getDefaultCompany());
    }

    public forCompany(realm: string): QuickBooksCompanyTermsService {
        return new QuickBooksCompanyTermsService(realm, this.authService, this.http);
    }
}

export class QuickBooksCompanyTermsService extends BaseService<QuickBooksTerms, QuickBooksTermsQuery, QuickBooksTermsQueryResponseModel> {
    constructor(realm: string, authService: QuickBooksAuthService, http: HttpService) {
        super(realm, "term", authService, http);
    }

    public create(dto: CreateQuickBooksTermsDto): Observable<QuickBooksTermsResponseModel> {
        return this.post(dto);
    }

    public readById(id: string): Observable<QuickBooksTermsResponseModel> {
        return this.get(id);
    }
}
