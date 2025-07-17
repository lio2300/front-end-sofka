import {
    HttpClient,
    HttpErrorResponse,
} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment.dev";
import {HandleErrors} from "@app/Utils/handleErrors";

export interface IHttpResponse<T = unknown> {
    data: T;
}

@Injectable({
    providedIn: "root",
})
export class HttpService {
    private readonly httpClient = inject(HttpClient);

    public mainUrl = environment.apiURL;
    public prefix = "bp/";

    constructor() {
    }

    get<T>(url: string, headers = {}): Observable<IHttpResponse<T>> {
        return this.httpClient
            .get<IHttpResponse<T>>(`${this.mainUrl}${this.prefix}${url}`, headers)
            .pipe(catchError(error => this.handleError(error)));
    }

    post<T>(url: string, data: T, headers = {}): Observable<IHttpResponse<T>> {
        return this.httpClient.post<IHttpResponse<T>>(`${this.mainUrl}${this.prefix}${url}`, data, headers).pipe(
            catchError(error => this.handleError(error))
        );
    }

    put<T>(url: string, data: T, headers = {}): Observable<IHttpResponse<T>> {
        return this.httpClient.put<IHttpResponse<T>>(`${this.mainUrl}${this.prefix}${url}`, data, headers).pipe(
            catchError(error => this.handleError(error))
        );
    }

    delete<T>(url: string, headers = {}): Observable<IHttpResponse> {
        return this.httpClient.delete<IHttpResponse<T>>(`${this.mainUrl}${this.prefix}${url}`, headers).pipe(
            catchError(error => this.handleError(error))
        );
    }

    patch<T>(url: string, data: T, headers = {}): Observable<IHttpResponse> {
        return this.httpClient.patch<IHttpResponse<T>>(`${this.mainUrl}${this.prefix}${url}`, data, headers).pipe(
            catchError(error => this.handleError(error))
        );
    }

    public handleError(errorResponse: HttpErrorResponse) {
        const handleErrors = new HandleErrors(errorResponse);
        handleErrors.showError();
        return throwError(() => errorResponse);
    }
}
