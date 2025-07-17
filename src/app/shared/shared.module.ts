import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {DataTableModule} from "@app/shared/data-table/data-table.module";
import {DropdownModule} from "@app/shared/dropdown/dropdown.module";



@NgModule({
  declarations: [],
    imports: [
        CommonModule,
        DataTableModule,
        DropdownModule
    ],
    exports: [
        DataTableModule,
        DropdownModule
    ]
})
export class SharedModule { }
