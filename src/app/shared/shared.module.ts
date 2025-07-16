import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';
import {PipesModule} from "@app/pipes/pipes.module";



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
export class SharedModule { }
