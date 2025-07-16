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
        // return this.httpService.get<IFinancialProducts[]>(`products`)
        //     .pipe(
        //         map(resp => resp.data)
        //     );
        return of({
            "data": [
                {
                    "id": "uno",
                    "name": "Nombre producto",
                    "description": "Descripción producto",
                    "logo": "assets-1.png",
                    "date_release": "2025-01-01",
                    "date_revision": "2025-01-01"
                },
                {
                    "id": "dos",
                    "name": "Nombre producto dos",
                    "description": "Descripción producto dos",
                    "logo": "assets-1.png",
                    "date_release": "2025-01-01",
                    "date_revision": "2025-01-01"
                },
                {
                    "id": "tres",
                    "name": "Nombre producto tres",
                    "description": "Descripción producto tres",
                    "logo": "assets-1.png",
                    "date_release": "2025-01-01",
                    "date_revision": "2025-01-01"
                }
            ]
        } as any)
            .pipe(
                delay(2000),
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
