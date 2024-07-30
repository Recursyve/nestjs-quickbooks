import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
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
    public fullUpdate(estimate: QuickBooksEstimates, dto: FullUpdateQuickBooksEstimateDto): Observable<QuickBooksEstimatesResponseModel>;
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

    public deleteById(estimate: QuickBooksEstimates): Observable<void> {
        return this.post({ Id: estimate.Id, SyncToken: estimate.SyncToken }, "", { operation: "delete" });
    }

    private static getUpdateArguments<DTO>(args: [string | QuickBooksEstimates, string | DTO, DTO?]): [string, string, DTO] {
        const [idOrEstimate, tokenOrDto, dto] = args;
        if (dto) {
            return [idOrEstimate as string, tokenOrDto as string, dto];
        }

        const estimate = idOrEstimate as QuickBooksEstimates;
        return [estimate.Id, estimate.SyncToken, tokenOrDto as DTO];
    }
}
