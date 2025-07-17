import {inject, Injectable} from "@angular/core";
import {
    AbstractControl,
    AsyncValidatorFn,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators
} from "@angular/forms";
import {IFormModule} from "@app/models/IFormModule";
import {finalize, map, Observable} from "rxjs";
import {HttpProductService} from "@app/services/financial-product/http-product.service";

@Injectable({
    providedIn: "root"
})
export class FormProductService implements IFormModule {
    readonly _formBuilder = inject(FormBuilder);
    private readonly _httpProduct = inject(HttpProductService);

    loadingVerifyIdExitsProduct: boolean = false;

    constructor() {
    }

    createForm(): FormGroup {
        return this._formBuilder.group(
            {
                id: new FormControl(
                    null,
                    [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
                    [this.idExistsValidator()]
                ),
                name: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
                description: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
                logo: new FormControl(null, [Validators.required]),
                date_release: new FormControl(null, [Validators.required]),
                date_revision: new FormControl({
                    value: null,
                    disabled: true
                }, [Validators.required]),
            },
        );
    }

    private idExistsValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            this.loadingVerifyIdExitsProduct = true;
            return this._httpProduct.verifyIdExitsProduct(control.value).pipe(
                map(exists => (exists ? {idExists: true} : null)),
                finalize(() => this.loadingVerifyIdExitsProduct = false),
            );
        };
    }
}
