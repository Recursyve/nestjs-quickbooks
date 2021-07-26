import { HttpService, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
import { QuickBooksStore } from "../../store";
import {
    CreateQuickBooksEstimateDto,
    FullUpdateQuickBooksEstimateDto,
    QuickBooksEstimates,
    QuickBooksEstimatesQuery,
    QuickBooksEstimatesQueryResponseModel,
    QuickBooksEstimatesResponseModel,
    SparseUpdateQuickBooksEstimateDto
} from "..";

@Injectable()
export class QuickBooksEstimatesService {
    constructor(
        private readonly authService: QuickBooksAuthService,
        private readonly http: HttpService,
        private readonly store: QuickBooksStore
    ) {
    }

    public async withDefaultCompany(): Promise<QuickBooksCompanyEstimateService> {
        return this.forCompany(await this.store.getDefaultCompany());
    }

    public forCompany(realm: string): QuickBooksCompanyEstimateService {
        return new QuickBooksCompanyEstimateService(realm, this.authService, this.http);
    }
}

export class QuickBooksCompanyEstimateService extends BaseService<QuickBooksEstimates,
    QuickBooksEstimatesQuery,
    QuickBooksEstimatesQueryResponseModel> {
    constructor(realm: string, authService: QuickBooksAuthService, http: HttpService) {
        super(realm, "estimate", authService, http);
    }

    public create(dto: CreateQuickBooksEstimateDto): Observable<QuickBooksEstimatesResponseModel> {
        return this.post(dto);
    }

    public readById(id: string): Observable<QuickBooksEstimatesResponseModel> {
        return this.get(id);
    }

    public fullUpdate(id: string, token: string, dto: FullUpdateQuickBooksEstimateDto): Observable<QuickBooksEstimatesResponseModel>;
    public fullUpdate(invoice: QuickBooksEstimates, dto: FullUpdateQuickBooksEstimateDto): Observable<QuickBooksEstimatesResponseModel>;
    public fullUpdate(
        ...args: [string | QuickBooksEstimates, string | FullUpdateQuickBooksEstimateDto, FullUpdateQuickBooksEstimateDto?]
    ): Observable<QuickBooksEstimatesResponseModel> {
        const [id, token, dto] = QuickBooksCompanyEstimateService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token
        });
    }

    public sparseUpdate(id: string, token: string, dto: SparseUpdateQuickBooksEstimateDto): Observable<QuickBooksEstimatesResponseModel>;
    public sparseUpdate(estimate: QuickBooksEstimates, dto: SparseUpdateQuickBooksEstimateDto): Observable<QuickBooksEstimatesResponseModel>;
    public sparseUpdate(
        ...args: [string | QuickBooksEstimates, string | SparseUpdateQuickBooksEstimateDto, SparseUpdateQuickBooksEstimateDto?]
    ): Observable<QuickBooksEstimatesResponseModel> {
        const [id, token, dto] = QuickBooksCompanyEstimateService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token,
            sparse: true
        });
    }

    private static getUpdateArguments<DTO>(args: [string | QuickBooksEstimates, string | DTO, DTO?]): [string, string, DTO] {
        const [idOrInvoice, tokenOrDto, dto] = args;
        if (dto) {
            return [idOrInvoice as string, tokenOrDto as string, dto];
        }

        const invoice = idOrInvoice as QuickBooksEstimates;
        return [invoice.Id, invoice.SyncToken, tokenOrDto as DTO];
    }
}
