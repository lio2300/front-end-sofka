import {
    AfterContentInit,
    Component,
    ContentChildren,
    ElementRef,
    inject,
    QueryList,
    Renderer2,
    ViewChild
} from "@angular/core";
import {DropdownTemplateDirective} from "@app/directives/dropdown-template/dropdown-template.directive";
import {fromEvent} from "rxjs";

@Component({
    selector: "app-dropdown",
    standalone: false,
    templateUrl: "./dropdown.component.html",
    styleUrl: "./dropdown.component.scss"
})
export class DropdownComponent implements AfterContentInit {
    private readonly renderer = inject(Renderer2);

    @ContentChildren(DropdownTemplateDirective) contentTemplates!: QueryList<DropdownTemplateDirective>;
    @ViewChild("triggerContainer", {read: ElementRef}) triggerContainer?: ElementRef;
    @ViewChild("menuContent", {read: ElementRef}) menuContent?: ElementRef;

    itemMenu: DropdownTemplateDirective[] = [];
    menuTrigger: DropdownTemplateDirective | undefined;

    ngAfterContentInit(): void {
        this.itemMenu = this.contentTemplates.filter(
            value => value.type === "item"
        );

        this.menuTrigger = this.contentTemplates.find(
            value => value.type === "menuTrigger"
        );

        fromEvent(document, "click").subscribe((event: Event) => {
            const clickedInsideTrigger = this.triggerContainer?.nativeElement.contains(event.target);
            const clickedInsideContent = this.menuContent?.nativeElement.contains(event.target);

            if (!clickedInsideTrigger && !clickedInsideContent) {
                this.renderer.addClass(this.menuContent?.nativeElement, "d-none");
            }
        });

        setTimeout(() => {
            if (this.triggerContainer) {
                fromEvent(this.triggerContainer.nativeElement, "click").subscribe(() => {
                    this.renderer.removeClass(this.menuContent?.nativeElement, "d-none");
                });
            }

            if (this.menuContent) {
                fromEvent(this.menuContent.nativeElement, "click").subscribe(() => {
                    this.renderer.addClass(this.menuContent!.nativeElement, "d-none");
                });
            }
        });
    }
}
