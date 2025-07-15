import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormatDatePipe } from "./format-date/format-date.pipe";
import { NotEmptyPipe } from "./not-empty/not-empty.pipe";



@NgModule({
  declarations: [
    FormatDatePipe,
    NotEmptyPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
