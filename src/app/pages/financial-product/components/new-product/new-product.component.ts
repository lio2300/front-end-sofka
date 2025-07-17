import {Component, inject, OnInit} from "@angular/core";
import {FormProductService} from "@app/services/financial-product/form-product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpProductService} from "@app/services/financial-product/http-product.service";

@Component({
    selector: "app-new-product",
    standalone: false,
    templateUrl: "./new-product.component.html",
    styleUrl: "./new-product.component.scss"
})
export class NewProductComponent implements OnInit {
    readonly formProductService = inject(FormProductService);
    private readonly _route = inject(ActivatedRoute);
    private readonly _router = inject(Router);
    private readonly _httpProduct = inject(HttpProductService);
    readonly formProduct = this.formProductService.createForm();

    loadingSaveProduct: boolean = false;
    idProduct!: string;
    today = new Date().toISOString().substring(0, 10);
    ngOnInit(): void {
        this.assigmentDataForm();
    }

    assigmentDataForm(): void {
        this.idProduct = this._route.snapshot.queryParams["id"];
        if (this.idProduct) {
            //code here for update
        } else {

            this.formProduct.get("date_revision")?.setValue(this.today);
            this.formProduct.get("date_revision")!.disable();
        }
    }

    saveProduct(): void {
        if (this.formProduct.invalid) {
            return;
        }

        this.loadingSaveProduct = true;
        this._httpProduct.saveProduct(this.formProduct.getRawValue()).subscribe({
            next: () => {
                this.formProduct.reset();
                this.loadingSaveProduct = false;
                this._router.navigate(["/products"]);
            },
            error: () => {
                this.loadingSaveProduct = false;
            }
        });
    }

    resetForm(): void {
        const fieldsDefaultReset = {
            name: null,
            description: null,
            logo: null,
            date_release: null,
            date_revision: this.today
        };

        if (this.idProduct) {
            this.formProduct.reset(fieldsDefaultReset);
        } else {
            this.formProduct.reset({
                ...fieldsDefaultReset,
                id: null,
            });
        }
    }
}
