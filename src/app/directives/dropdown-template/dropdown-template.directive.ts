import {Directive, Input, TemplateRef} from "@angular/core";

@Directive({
  selector: "[appDropdownTemplate]",
  standalone: false
})
export class DropdownTemplateDirective {
  @Input() type!: "menuTrigger" | "item";
  constructor(public templateRef: TemplateRef<any>) {}
}
