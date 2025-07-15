import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable, throwError} from "rxjs";
import {retry} from "rxjs/operators";
import {IHttpHeaderModule, IHttpModule} from "@app/models/IHttpModule";

export interface IHttpResponse<T = unknown> {
    data: Record<string, T>;
}

@Injectable({
    providedIn: "root",
})
export class HttpService {

    public mainUrl = "http://localhost:3002/";
    public prefix = "bp/";

    constructor(
        private readonly httpClient: HttpClient,
    ) {
    }

    get<T>(url: string, headers = {}): Observable<IHttpResponse> {
        return this.httpClient
            .get<IHttpResponse<T>>(url, headers)
            .pipe(catchError(error => this.handleError(error)));
    }

    post<T>(url: string, data: Record<string, unknown>, headers = {}) {
        return this.httpClient.post<IHttpResponse<T>>(url, data, headers).pipe(
            retry(3),
            catchError(error => this.handleError(error))
        );
    }

    put<T>(url: string, data: Record<string, unknown>, headers = {}): Observable<IHttpResponse> {
        return this.httpClient.put<IHttpResponse<T>>(url, data, headers).pipe(
            retry(3),
            catchError(error => this.handleError(error))
        );
    }

    delete<T>(url: string, headers = {}): Observable<IHttpResponse> {
        return this.httpClient.delete<IHttpResponse<T>>(url, headers).pipe(
            retry(3),
            catchError(error => this.handleError(error))
        );
    }

    patch<T>(url: string, data: Record<string, unknown>, headers = {}): Observable<IHttpResponse> {
        return this.httpClient.patch<IHttpResponse<T>>(url, data, headers).pipe(
            retry(3),
            catchError(error => this.handleError(error))
        );
    }

    public handleError(errorResponse: HttpErrorResponse) {
        return throwError(() => errorResponse);
    }

    getModule<T>({module, mainUrl = this.mainUrl, token, noCache}: IHttpModule): Observable<IHttpResponse> {
        const header = this.getHeader({token, noCache});

        return this.get<T>(`${mainUrl}/${this.prefix}/${module}`, header);
    }

    postModule<T>({
                                module,
                                mainUrl = this.mainUrl,
                                token,
                                noCache,
                                data
                            }: IHttpModule): Observable<IHttpResponse> {
        const header = this.getHeader({token, noCache});

        return this.post<T>(`${mainUrl}/${this.prefix}/${module}`, data ?? {}, header);
    }

    putModule<T>({module, mainUrl = this.mainUrl, token, noCache, data}: IHttpModule): Observable<IHttpResponse> {
        const header = this.getHeader({token, noCache});

        return this.put<T>(`${mainUrl}/${this.prefix}/${module}`, data ?? {}, header);
    }

    deleteModule<T>({module, mainUrl = this.mainUrl, token, noCache}: IHttpModule): Observable<IHttpResponse> {
        const header = this.getHeader({token, noCache});

        return this.delete<T>(`${mainUrl}/${this.prefix}/${module}`, header);
    }

    patchModule<T>({module, mainUrl = this.mainUrl, token, noCache, data}: IHttpModule): Observable<IHttpResponse> {
        const header = this.getHeader({token, noCache});
        return this.patch<T>(`${mainUrl}/${this.prefix}/${module}`, data ?? {}, header);
    }

    getHeader({token, noCache, isPublic}: IHttpHeaderModule) {
        let header = {headers: new HttpHeaders()};
        if (isPublic) {
            header = token ? {headers: new HttpHeaders({Authorization: `Bearer ${token}`})} : header;
        }

        if (noCache) {
            header.headers = header.headers
                // .set('Content-Type', 'application/json; charset=utf-8')
                .set(
                    "Cache-Control",
                    "no-cache, no-store, must-revalidate, post-check=0, pre-check=0"
                )
                .set("Pragma", "no-cache")
                .set("Expires", "0");
        }

        return header;
    }
}
