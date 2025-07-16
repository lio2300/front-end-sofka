import {Directive, Input, TemplateRef} from "@angular/core";

@Directive({
  selector: "[appDataTableTemplate]",
  standalone: false
})
export class DataTableTemplateDirective {
  @Input() type!: "column" | "action" | "label";
  @Input() name!: string;
  constructor(public templateRef: TemplateRef<any>) {}
}
