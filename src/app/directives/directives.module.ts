import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputSofkaDirective } from "./input-sofka/input-sofka.directive";
import { DataTableTemplateDirective } from './data-table-template/data-table-template.directive';



@NgModule({
  declarations: [
    InputSofkaDirective,
    DataTableTemplateDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InputSofkaDirective,
    DataTableTemplateDirective
  ]
})
export class DirectivesModule { }
