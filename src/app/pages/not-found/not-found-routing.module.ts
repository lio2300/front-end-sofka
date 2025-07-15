import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {NotFoundComponent} from "@app/pages/not-found/components/not-found/not-found.component";

const defaultRoute = "/";

const routes: Routes = [
  {
    path: "",
    component: NotFoundComponent,
  },
  { path: "", redirectTo: defaultRoute, pathMatch: "full" },
  { path: "**", redirectTo: defaultRoute, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotFoundRoutingModule { }
