import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FinancialProductRoutingModule } from "./financial-product-routing.module";
import { ProductComponent } from "./components/product/product.component";


@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    FinancialProductRoutingModule
  ]
})
export class FinancialProductModule { }
