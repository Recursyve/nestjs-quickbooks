import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
import { QuickBooksStore } from "../../store";
import {
    FullUpdateQuickBooksCompanyInfoDto,
    QuickBooksCompanyInfo,
    QuickBooksCompanyInfoQueryModel,
    QuickBooksCompanyInfoQueryResponseModel,
    QuickBooksCompanyInfoResponseModel,
    SparseUpdateQuickBooksCompanyInfoDto
} from "..";

@Injectable()
export class QuickBooksCompanyInfoService {
    constructor(
        private readonly authService: QuickBooksAuthService,
        private readonly http: HttpService,
        private readonly store: QuickBooksStore
    ) {
    }

    public async withDefaultCompany(): Promise<QuickBooksCompanyCompanyInfoService> {
        return this.forCompany(await this.store.getDefaultCompany());
    }

    public forCompany(realm: string): QuickBooksCompanyCompanyInfoService {
        return new QuickBooksCompanyCompanyInfoService(realm, this.authService, this.http);
    }
}

export class QuickBooksCompanyCompanyInfoService extends BaseService<
    QuickBooksCompanyInfoResponseModel, QuickBooksCompanyInfoQueryModel, QuickBooksCompanyInfoQueryResponseModel
> {
    constructor(protected readonly realm: string, authService: QuickBooksAuthService, http: HttpService) {
        super(realm, "companyinfo", authService, http);
    }

    public read(): Observable<QuickBooksCompanyInfoResponseModel> {
        return this.get(this.realm);
    }

    public fullUpdate(id: string, token: string, dto: FullUpdateQuickBooksCompanyInfoDto): Observable<QuickBooksCompanyInfoResponseModel>;
    public fullUpdate(company: QuickBooksCompanyInfo, dto: FullUpdateQuickBooksCompanyInfoDto): Observable<QuickBooksCompanyInfoResponseModel>;
    public fullUpdate(
        ...args: [string | QuickBooksCompanyInfo, string | FullUpdateQuickBooksCompanyInfoDto, FullUpdateQuickBooksCompanyInfoDto?]
    ): Observable<QuickBooksCompanyInfoResponseModel> {
        const [id, token, dto] = QuickBooksCompanyCompanyInfoService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token
        });
    }

    public sparseUpdate(id: string, token: string, dto: SparseUpdateQuickBooksCompanyInfoDto): Observable<QuickBooksCompanyInfoResponseModel>;
    public sparseUpdate(company: QuickBooksCompanyInfo, dto: SparseUpdateQuickBooksCompanyInfoDto): Observable<QuickBooksCompanyInfoResponseModel>;
    public sparseUpdate(
        ...args: [string | QuickBooksCompanyInfo, string | SparseUpdateQuickBooksCompanyInfoDto, SparseUpdateQuickBooksCompanyInfoDto?]
    ): Observable<QuickBooksCompanyInfoResponseModel> {
        const [id, token, dto] = QuickBooksCompanyCompanyInfoService.getUpdateArguments(args);
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
