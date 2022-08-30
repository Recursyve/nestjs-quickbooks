import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { QueryUtils } from "../../utils/query.utils";
import { QuickBooksAuthService } from "../auth/services/auth.service";
import { WhereOptions } from "./models";

@Injectable()
export class BaseService<Response, Query, QueryResponse> {
    private readonly sandboxUrl = "https://sandbox-quickbooks.api.intuit.com";
    private readonly liveUrl = "https://quickbooks.api.intuit.com";

    private minorVersion: { minorversion?: string } = {};

    constructor(
        protected readonly realm: string,
        private readonly resource: string,
        private readonly authService: QuickBooksAuthService,
        private readonly http: HttpService
    ) {
        if (authService.minorVersion) {
            this.minorVersion = { minorversion: authService.minorVersion };
        }
    }

    protected get apiUrl(): string {
        return this.authService.mode === "production" ? this.liveUrl : this.sandboxUrl;
    }

    public query(condition: WhereOptions<Query>): Observable<QueryResponse> {
        return this.getHttpHeaders().pipe(
            mergeMap((headers) => this.http.get<QueryResponse>(this.queryUrl(condition), {
                headers,
                params: {
                    ...this.minorVersion
                }
            }))
        ).pipe(
            map(x => x.data)
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
            map(x => x.data)
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
            map(x => x.data)
        );
    }

    protected queryUrl(condition: WhereOptions<any>): string {
        return `${this.apiUrl}/v3/company/${this.realm}/query?${QueryUtils.generateQuery(this.resource, condition)}`;
    }

    protected url(path: string): string {
        if (!path) {
            return `${this.apiUrl}/v3/company/${this.realm}/${this.resource}`;
        }
        return `${this.apiUrl}/v3/company/${this.realm}/${this.resource}/${path}`;
    }

    private getHttpHeaders(): Observable<any> {
        return this.authService.getToken(this.realm).pipe(
            map((token) => ({
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }))
        );
    }
}
