import {Component, inject, OnDestroy, OnInit} from "@angular/core";
import {FormProductService} from "@app/services/financial-product/form-product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpProductService} from "@app/services/financial-product/http-product.service";
import moment from "moment";
import {Subscription} from "rxjs";

@Component({
    selector: "app-new-product",
    standalone: false,
    templateUrl: "./new-product.component.html",
    styleUrl: "./new-product.component.scss"
})
export class NewProductComponent implements OnInit, OnDestroy {
    readonly formProductService = inject(FormProductService);
    private readonly _route = inject(ActivatedRoute);
    private readonly _router = inject(Router);
    private readonly _httpProduct = inject(HttpProductService);
    readonly formProduct = this.formProductService.createForm();

    loadingSaveProduct: boolean = false;
    idProduct!: string;
    today = moment().format("YYYY-MM-DD");
    statusChangesSubscription: Record<string, Subscription> = {};

    ngOnInit(): void {
        this.assigmentDataForm();
    }

    ngOnDestroy(): void {
        Object.values(this.statusChangesSubscription).forEach(subscription => subscription.unsubscribe());
    }

    assigmentDataForm(): void {
        this.idProduct = this._route.snapshot.queryParams["id"];
        if (this.idProduct) {
            //code here for update
        }

        this.statusChangesSubscription["changeStatusDateRelease"] = this.formProduct.get("date_release")!.valueChanges.subscribe((value) => {
            this.formProduct.get("date_revision")?.setValue(moment(value).add(1, "year").format("YYYY-MM-DD"));
        });
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
