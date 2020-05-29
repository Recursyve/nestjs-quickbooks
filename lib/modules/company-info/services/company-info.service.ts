import { HttpService, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
import { QuickBooksStore } from "../../store/store.service";
import { QuickBooksCompanyInfoQuery, QuickBooksCompanyInfoQueryResponse } from "../models/company-info.query";
import { QuickBooksCompanyInfo } from "../models/company-info.model";
import { FullUpdateQuickBooksCompanyInfoDto, SparseUpdateQuickBooksCompanyInfoDto } from "../dto/company-info.dto";

@Injectable()
export class QuickBooksCompanyInfoService {
    constructor(
        private readonly authService: QuickBooksAuthService,
        private readonly http: HttpService,
        private readonly store: QuickBooksStore
    ) {}

    public async withDefaultCompany(): Promise<CompanyInfoService> {
        return this.forCompany(await this.store.getDefaultCompany());
    }

    public forCompany(realm: string): CompanyInfoService {
        return new CompanyInfoService(realm, this.authService, this.http);
    }
}

class CompanyInfoService extends BaseService<QuickBooksCompanyInfo, QuickBooksCompanyInfoQuery, QuickBooksCompanyInfoQueryResponse> {
    constructor(realm: string, authService: QuickBooksAuthService, http: HttpService) {
        super(realm, "companyInfo", authService, http);
    }

    public read(): Observable<any> {
        return this.get();
    }

    public fullUpdate(id: string, token: string, dto: FullUpdateQuickBooksCompanyInfoDto): Observable<QuickBooksCompanyInfo>;
    public fullUpdate(company: QuickBooksCompanyInfo, dto: FullUpdateQuickBooksCompanyInfoDto): Observable<QuickBooksCompanyInfo>;
    public fullUpdate(
        ...args: [string | QuickBooksCompanyInfo, string | FullUpdateQuickBooksCompanyInfoDto, FullUpdateQuickBooksCompanyInfoDto?]
    ): Observable<QuickBooksCompanyInfo> {
        const [id, token, dto] = CompanyInfoService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token
        });
    }

    public sparseUpdate(id: string, token: string, dto: SparseUpdateQuickBooksCompanyInfoDto): Observable<QuickBooksCompanyInfo>;
    public sparseUpdate(company: QuickBooksCompanyInfo, dto: SparseUpdateQuickBooksCompanyInfoDto): Observable<QuickBooksCompanyInfo>;
    public sparseUpdate(
        ...args: [string | QuickBooksCompanyInfo, string | SparseUpdateQuickBooksCompanyInfoDto, SparseUpdateQuickBooksCompanyInfoDto?]
    ): Observable<QuickBooksCompanyInfo> {
        const [id, token, dto] = CompanyInfoService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token,
            sparse: true
        });
    }

    private static getUpdateArguments<DTO>(args: [string | QuickBooksCompanyInfo, string | DTO, DTO?]): [string, string, DTO] {
        const [idOrCompany, tokenOrDto, dto] = args;
        if (dto) {
            return [idOrCompany as string, tokenOrDto as string, dto];
        }

        const company = idOrCompany as QuickBooksCompanyInfo;
        return [company.Id, company.SyncToken, tokenOrDto as DTO];
    }
}
