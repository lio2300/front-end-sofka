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

    /**
     * Filter the financial products list by ID, searching whether the ID product
     * or the name of product matches with the given ID.
     * @param id ID financial product
     * @returns An array of financial products which matches with the given ID
     */
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

    /**
     * Saves a new financial product.
     * @param product The financial product to be saved.
     * @returns An observable that emits the saved financial product.
     */
    saveProduct(product: IFinancialProducts): Observable<IFinancialProducts> {
        return this.httpService.post<IFinancialProducts>(`products`, product)
            .pipe(
                map((resp) => resp.data),
            );
    }

    /**
     * Updates a financial product with the given ID.
     * @param product The financial product to be updated.
     * @returns An observable that emits the updated financial product.
     */
    updateProduct(product: IFinancialProducts): Observable<IFinancialProducts> {
        return this.httpService.put<IFinancialProducts>(`products/${product.id}`, product)
            .pipe(
                map((resp) => resp as unknown as IFinancialProducts),
            );
    }
}
