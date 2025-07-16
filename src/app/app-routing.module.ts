import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const defaultRoute = "/financial-product";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "financial-product",
        loadChildren: () =>
            import("@app/pages/financial-product/financial-product.module").then(
                m => m.FinancialProductModule
            ),
      },
      { path: "", redirectTo: defaultRoute, pathMatch: "full" },
      { path: "**", redirectTo: defaultRoute, pathMatch: "full" },
    ],
  },
  { path: "", redirectTo: defaultRoute, pathMatch: "full" },
  { path: "**", redirectTo: defaultRoute, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
