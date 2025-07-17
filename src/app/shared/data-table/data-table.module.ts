import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {PipesModule} from "@app/pipes/pipes.module";
import {DataTableComponent} from "@app/shared/data-table/data-table.component";



@NgModule({
  declarations: [
    DataTableComponent
  ],
  imports: [
    CommonModule,
    PipesModule
  ],
  exports: [DataTableComponent]
})
export class DataTableModule { }
