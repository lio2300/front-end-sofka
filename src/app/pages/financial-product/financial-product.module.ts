import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FinancialProductRoutingModule } from "./financial-product-routing.module";
import { ProductComponent } from "./components/product/product.component";
import {SharedModule} from "@app/shared/shared.module";


@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    FinancialProductRoutingModule,
    SharedModule
  ]
})
export class FinancialProductModule { }
