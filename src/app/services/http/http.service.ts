import {
    HttpClient,
    HttpErrorResponse,
} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {catchError, Observable, throwError} from "rxjs";
import {retry} from "rxjs/operators";

export interface IHttpResponse<T = unknown> {
    data: Record<string, T>;
}

@Injectable({
    providedIn: "root",
})
export class HttpService {
    private readonly httpClient = inject(HttpClient);

    public mainUrl = "http://localhost:3002/";
    public prefix = "bp/";

    constructor() {
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
}
