import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {ProductComponent} from "@app/pages/financial-product/components/product/product.component";
import {NewProductComponent} from "@app/pages/financial-product/components/new-product/new-product.component";

const defaultRoute = "/";

const routes: Routes = [
  {
    path: "",
    component: ProductComponent,
  },
  {
    path: "new",
    component: NewProductComponent,
  },
  {
    path: ":id",
    component: NewProductComponent,
  },
  { path: "", redirectTo: defaultRoute, pathMatch: "full" },
  { path: "**", redirectTo: defaultRoute, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialProductRoutingModule { }
