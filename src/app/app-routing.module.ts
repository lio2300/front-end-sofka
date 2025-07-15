import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {AppComponent} from "./app.component";

const defaultRoute = "/financial-product";

const routes: Routes = [
  {
    path: "",
    component: AppComponent,
    children: [
      {
        path: "financial-product",
        loadChildren: () =>
            import("@app/pages/financial-product/financial-product-routing.module").then(
                m => m.FinancialProductRoutingModule
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
