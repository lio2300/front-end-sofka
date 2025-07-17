import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {DataTableModule} from "@app/shared/data-table/data-table.module";



@NgModule({
  declarations: [],
    imports: [
        CommonModule,
        DataTableModule
    ],
    exports: [
        DataTableModule
    ]
})
export class SharedModule { }
