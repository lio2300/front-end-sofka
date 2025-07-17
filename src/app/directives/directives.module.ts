import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputSofkaDirective } from "./input-sofka/input-sofka.directive";
import { DataTableTemplateDirective } from "./data-table-template/data-table-template.directive";
import { DropdownTemplateDirective } from "./dropdown-template/dropdown-template.directive";



@NgModule({
  declarations: [
    InputSofkaDirective,
    DataTableTemplateDirective,
    DropdownTemplateDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InputSofkaDirective,
    DataTableTemplateDirective,
    DropdownTemplateDirective
  ]
})
export class DirectivesModule { }
