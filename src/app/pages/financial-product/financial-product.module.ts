import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {FinancialProductRoutingModule} from "./financial-product-routing.module";
import {ProductComponent} from "./components/product/product.component";
import {SharedModule} from "@app/shared/shared.module";
import {DirectivesModule} from "@app/directives/directives.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PipesModule} from "@app/pipes/pipes.module";
import { NewProductComponent } from './components/new-product/new-product.component';


@NgModule({
    declarations: [
        ProductComponent,
        NewProductComponent
    ],
    imports: [
        CommonModule,
        FinancialProductRoutingModule,
        SharedModule,
        DirectivesModule,
        FormsModule,
        ReactiveFormsModule,
        PipesModule
    ]
})
export class FinancialProductModule {
}
