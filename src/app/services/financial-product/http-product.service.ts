import {inject, Injectable} from "@angular/core";
import {HttpService} from "@app/services/http/http.service";
import {map, Observable, tap} from "rxjs";
import {IFinancialProducts} from "@app/models/IFinancialProducts";

@Injectable({
    providedIn: "root"
})
export class HttpProductService {
    private readonly httpService = inject(HttpService);
    private originalFinancialProducts: IFinancialProducts[] = [];

    constructor() {
    }

    /**
     * Get products for Data Table
     * @param id ID financial product
     */
    retrieveProducts(id: string): Observable<IFinancialProducts[]> {
        return this.httpService.get<IFinancialProducts[]>(`products`)
            .pipe(
                tap(({data}) => {
                    this.originalFinancialProducts = data;
                }),
                map(resp => resp.data),
                map((resp) => {
                    if (id) {
                        return this.findFinancialProductById(id);
                    }

                    return resp;
                }),
            );
    }

    findFinancialProductById(id: string): IFinancialProducts[] {
        return this.originalFinancialProducts.filter(({id: idProduct, name}) => new RegExp(id, "ig").test(idProduct) || new RegExp(id, "ig").test(name));
    }

    /**
     * Verify whether exits the ID product
     * @param id ID product
     */
    verifyIdExitsProduct(id: string): Observable<boolean> {
        return this.httpService.get<boolean>(`products/verification/${id}`)
            .pipe(
                map((resp) => resp as unknown as boolean),
            );
    }

    saveProduct(product: IFinancialProducts): Observable<IFinancialProducts> {
        return this.httpService.post<IFinancialProducts>(`products`, product)
            .pipe(
                map((resp) => resp.data),
            );
    }

    updateProduct(product: IFinancialProducts): Observable<IFinancialProducts> {
        return this.httpService.put<IFinancialProducts>(`products/${product.id}`, product)
            .pipe(
                map((resp) => resp as unknown as IFinancialProducts),
            );
    }
}
