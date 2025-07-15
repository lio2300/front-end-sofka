import {FormBuilder, FormGroup} from "@angular/forms";

export interface IFormModule {
    readonly _formBuilder: FormBuilder;

    createForm(): FormGroup;
}
