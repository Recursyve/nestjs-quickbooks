import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import * as FormData from "form-data";
import { promisify } from "util";
import { combineLatestWith, map, mergeMap } from "rxjs/operators";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { QuickBooksStore } from "../../store";
import { BaseService } from "../../common/base.service";
import {
    CreateQuickBooksAttachableNoteDto,
    FullUpdateQuickBooksAttachableDto,
    UploadQuickBooksAttachableNoteDto
} from "../dto/attachables.dto";
import { QuickBooksAttachablesQueryModel } from "../models/attachables-query.model";
import {
    QuickBooksAttachablesDeleteResponseModel,
    QuickBooksAttachablesQueryResponseModel,
    QuickBooksAttachablesResponseModel,
    QuickBooksAttachablesUploadResponseModel
} from "../models/attachables-response.model";
import { from, Observable } from "rxjs";
import { QuickBooksAttachables } from "../models/attachables.model";

@Injectable()
export class QuickBooksAttachablesService {
    constructor(
        private readonly authService: QuickBooksAuthService,
        private readonly http: HttpService,
        private readonly store: QuickBooksStore
    ) {
    }

    public async withDefaultCompany(): Promise<QuickBooksCompanyAttachablesService> {
        return this.forCompany(await this.store.getDefaultCompany());
    }

    public forCompany(realm: string): QuickBooksCompanyAttachablesService {
        return new QuickBooksCompanyAttachablesService(realm, this.authService, this.http);
    }
}

export class QuickBooksCompanyAttachablesService extends BaseService<QuickBooksAttachablesResponseModel,
    QuickBooksAttachablesQueryModel,
    QuickBooksAttachablesQueryResponseModel> {

    constructor(realm: string, authService: QuickBooksAuthService, http: HttpService) {
        super(realm, "attachable", authService, http);
    }

    public createNote(dto: CreateQuickBooksAttachableNoteDto): Observable<QuickBooksAttachablesResponseModel> {
        return this.post(dto);
    }

    public readById(id: string): Observable<QuickBooksAttachablesResponseModel> {
        return this.get(id);
    }

    public fullUpdate(id: string, token: string, dto: FullUpdateQuickBooksAttachableDto): Observable<QuickBooksAttachablesResponseModel>;
    public fullUpdate(account: QuickBooksAttachables, dto: FullUpdateQuickBooksAttachableDto): Observable<QuickBooksAttachablesResponseModel>;
    public fullUpdate(
        ...args: [string | QuickBooksAttachables, string | FullUpdateQuickBooksAttachableDto, FullUpdateQuickBooksAttachableDto?]
    ): Observable<QuickBooksAttachablesResponseModel> {
        const [id, token, dto] = QuickBooksCompanyAttachablesService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token
        });
    }

    public delete(attachable: QuickBooksAttachables): Observable<QuickBooksAttachablesDeleteResponseModel> {
        return this.post(attachable, "", {
            operation: "delete"
        });
    }

    public download(id: string): Observable<string> {
        return this.getHttpHeaders().pipe(
            mergeMap((authHeaders) => this.http.get<string>(this.rawUrl(`download/${id}`), {
                headers: authHeaders,
                params: this.minorVersion,
                responseType: "text"
            }))
        ).pipe(
            map(x => x.data)
        );
    }

    public upload(dto: UploadQuickBooksAttachableNoteDto): Observable<QuickBooksAttachablesUploadResponseModel> {
        const data = new FormData();
        const { File, ...values } = dto;
        data.append("file_content_0", File, { filename: dto.FileName, contentType: dto.ContentType, knownLength: File.length });
        data.append("file_metadata_0", JSON.stringify(values), { filename: "attachment.json" });
        const getLength = promisify(data.getLength).bind(data);
        return this.getHttpHeaders().pipe(
            combineLatestWith(from(getLength())),
            mergeMap(([authHeaders, length]) => this.http.post<QuickBooksAttachablesUploadResponseModel>(this.rawUrl(`upload`), data, {
                headers: data.getHeaders({
                    ...authHeaders,
                    "Content-Length": length
                }),
                params: this.minorVersion
            }))
        ).pipe(
            map(x => x.data)
        );
    }

    private static getUpdateArguments<DTO>(args: [string | QuickBooksAttachables, string | DTO, DTO?]): [string, string, DTO] {
        const [idOrAttachable, tokenOrDto, dto] = args;
        if (dto) {
            return [idOrAttachable as string, tokenOrDto as string, dto];
        }

        const attachable = idOrAttachable as QuickBooksAttachables;
        return [attachable.Id, attachable.SyncToken, tokenOrDto as DTO];
    }
}
