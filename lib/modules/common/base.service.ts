import { HttpService } from "@nestjs/axios";
import { HttpStatus, Injectable } from "@nestjs/common";
import { AxiosError } from "axios";
import { catchError, Observable, throwError } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { QueryUtils } from "../../utils/query.utils";
import { QuickBooksAuthService } from "../auth/services/auth.service";
import { QuickbooksBadRequestException, QuickbooksUnauthorizedException } from "./exceptions";
import { QueryOptions, QueryStatementType, WhereOptions } from "./models";

@Injectable()
export class BaseService<Response, Query, QueryResponse> {
    private readonly sandboxUrl = "https://sandbox-quickbooks.api.intuit.com";
    private readonly liveUrl = "https://quickbooks.api.intuit.com";

    protected readonly minorVersion: { minorversion?: string } = {};

    constructor(
        protected readonly realm: string,
        private readonly resource: string,
        private readonly authService: QuickBooksAuthService,
        protected readonly http: HttpService
    ) {
        if (authService.minorVersion) {
            this.minorVersion = { minorversion: authService.minorVersion };
        }
    }

    protected get apiUrl(): string {
        return this.authService.mode === "production" ? this.liveUrl : this.sandboxUrl;
    }

    public query(condition: WhereOptions<Query>, options?: QueryOptions): Observable<QueryResponse> {
        return this.getHttpHeaders().pipe(
            mergeMap((headers) => this.http.get<QueryResponse>(this.queryUrl(QueryStatementType.Select, condition, options), {
                headers,
                params: {
                    ...this.minorVersion
                }
            }))
        ).pipe(
            map(x => x.data),
            catchError((e) => throwError(() => this.catchError(e)))
        );
    }

    public count(condition: WhereOptions<Query>): Observable<QueryResponse> {
        return this.getHttpHeaders().pipe(
            mergeMap((headers) => this.http.get<QueryResponse>(this.queryUrl(QueryStatementType.Count, condition), {
                headers,
                params: {
                    ...this.minorVersion
                }
            }))
        ).pipe(
            map(x => x.data),
            catchError((e) => throwError(() => this.catchError(e)))
        );
    }

    protected get<R = Response>(path?: string, queryParams?: object, headers?: object): Observable<R> {
        return this.getHttpHeaders().pipe(
            mergeMap((authHeaders) => this.http.get<R>(this.url(path), {
                headers: {
                    ...authHeaders,
                    ...headers
                },
                params: {
                    ...this.minorVersion,
                    ...(queryParams ?? {})
                }
            }))
        ).pipe(
            map(x => x.data),
            catchError((e) => throwError(() => this.catchError(e)))
        );
    }

    protected post<R = Response>(body: any, path?: string, queryParams?: object, headers?: object): Observable<R> {
        return this.getHttpHeaders().pipe(
            mergeMap((authHeaders) => this.http.post<R>(this.url(path), body, {
                headers: {
                    ...authHeaders,
                    ...headers
                },
                params: {
                    ...this.minorVersion,
                    ...(queryParams ?? {})
                }
            }))
        ).pipe(
            map(x => x.data),
            catchError((e) => throwError(() => this.catchError(e)))
        );
    }

    protected queryUrl(statement: QueryStatementType, condition: WhereOptions<any>, options?: QueryOptions): string {
        return `${this.apiUrl}/v3/company/${this.realm}/query?${QueryUtils.generateQuery(this.resource, statement, condition, options)}`;
    }

    protected url(path: string): string {
        if (!path) {
            return `${this.apiUrl}/v3/company/${this.realm}/${this.resource}`;
        }
        return `${this.apiUrl}/v3/company/${this.realm}/${this.resource}/${path}`;
    }

    protected rawUrl(path: string): string {
        if (!path) {
            return `${this.apiUrl}/v3/company/${this.realm}`;
        }
        return `${this.apiUrl}/v3/company/${this.realm}/${path}`;
    }

    protected getHttpHeaders(): Observable<any> {
        return this.authService.getToken(this.realm).pipe(
            map((token) => ({
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }))
        );
    }

    protected catchError(e: AxiosError): Error {
        if (!e?.response) {
            return e;
        }

        if (e.response.status === HttpStatus.UNAUTHORIZED) {
            return new QuickbooksUnauthorizedException(e.response.data);
        }

        if (e.response.status === HttpStatus.BAD_REQUEST) {
            return new QuickbooksBadRequestException(e.response.data);
        }

        return e;
    }
}
