import { HttpService, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
import { QuickBooksStore } from "../../store";
import {
    CreateQuickBooksEmployeesDto,
    FullUpdateQuickBooksEmployeesDto,
    QuickBooksEmployees,
    QuickBooksEmployeesQueryModel,
    QuickBooksEmployeesQueryResponseModel,
    QuickBooksEmployeesResponseModel
} from "..";

@Injectable()
export class QuickBooksEmployeesService {
    constructor(
        private readonly authService: QuickBooksAuthService,
        private readonly http: HttpService,
        private readonly store: QuickBooksStore
    ) {
    }

    public async withDefaultCompany(): Promise<QuickBooksCompanyEmployeesService> {
        return this.forCompany(await this.store.getDefaultCompany());
    }

    public forCompany(realm: string): QuickBooksCompanyEmployeesService {
        return new QuickBooksCompanyEmployeesService(realm, this.authService, this.http);
    }
}

export class QuickBooksCompanyEmployeesService extends BaseService<
    QuickBooksEmployeesResponseModel, QuickBooksEmployeesQueryModel, QuickBooksEmployeesQueryResponseModel
> {
    constructor(realm: string, authService: QuickBooksAuthService, http: HttpService) {
        super(realm, "employee", authService, http);
    }

    public create(dto: CreateQuickBooksEmployeesDto): Observable<QuickBooksEmployeesResponseModel> {
        return this.post(dto);
    }

    public readById(id: string): Observable<QuickBooksEmployeesResponseModel> {
        return this.get(id);
    }

    public fullUpdate(id: string, token: string, dto: FullUpdateQuickBooksEmployeesDto): Observable<QuickBooksEmployeesResponseModel>;
    public fullUpdate(vendor: QuickBooksEmployees, dto: FullUpdateQuickBooksEmployeesDto): Observable<QuickBooksEmployeesResponseModel>;
    public fullUpdate(
        ...args: [string | QuickBooksEmployees, string | FullUpdateQuickBooksEmployeesDto, FullUpdateQuickBooksEmployeesDto?]
    ): Observable<QuickBooksEmployeesResponseModel> {
        const [id, token, dto] = QuickBooksCompanyEmployeesService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token
        });
    }

    private static getUpdateArguments<DTO>(args: [string | QuickBooksEmployees, string | DTO, DTO?]): [string, string, DTO] {
        const [idOrVendor, tokenOrDto, dto] = args;
        if (dto) {
            return [idOrVendor as string, tokenOrDto as string, dto];
        }

        const vendor = idOrVendor as QuickBooksEmployees;
        return [vendor.Id, vendor.SyncToken, tokenOrDto as DTO];
    }
}
