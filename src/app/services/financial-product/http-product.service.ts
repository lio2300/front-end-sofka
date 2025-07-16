import {inject, Injectable} from "@angular/core";
import {HttpService} from "@app/services/http/http.service";
import {delay, map, Observable, of} from "rxjs";
import {IFinancialProducts} from "@app/models/IFinancialProducts";

@Injectable({
    providedIn: "root"
})
export class HttpProductService {
    private readonly httpService = inject(HttpService);

    constructor() {
    }

    /**
     * Get products for Data Table
     */
    retrieveProducts(id: string): Observable<IFinancialProducts[]> {
        return this.httpService.get<IFinancialProducts[]>(`products`)
            .pipe(
                map(resp => resp.data)
            );
    }

    /**
     * Verify whether exits the ID product
     * @param id ID product
     */
    verifyIdExitsProduct(id: string): Observable<boolean> {
        return this.httpService.get<boolean>(`products/verification/${id}`)
            .pipe(
                map(() => true)
            );
    }
}
