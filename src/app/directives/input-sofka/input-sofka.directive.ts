import {Directive, ElementRef, inject, OnDestroy, OnInit, Optional, Renderer2} from "@angular/core";
import {NgControl} from "@angular/forms";
import {fromEvent, Subscription} from "rxjs";
import {getErrorMessage} from "@app/Utils/errorMessages";

@Directive({
    selector: "[appInputSofka]",
    standalone: false
})
export class InputSofkaDirective implements OnInit, OnDestroy {
    private readonly el = inject(ElementRef);
    private readonly renderer = inject(Renderer2);
    @Optional() private readonly control = inject(NgControl);

    statusChangesSubscription: Record<string, Subscription> = {};
    private errorElement?: HTMLElement;

    constructor() {
    }

    ngOnInit(): void {
        if (!this.control) {
            return;
        }

        this.renderer.addClass(this.el.nativeElement, "sofka-input-control");

        if (this.control) {
            this.statusChangesSubscription["statusChanges"] = this.control.statusChanges!.subscribe(() => {
                this.addOrRemoveClass(this.hasError);
            });

            this.statusChangesSubscription["fromEventClick"] = fromEvent<MouseEvent>(this.el.nativeElement, "click")
                .subscribe(() => {
                    this.addOrRemoveClass(this.hasError);
                });

            this.statusChangesSubscription["fromEventBlur"] = fromEvent<FocusEvent>(this.el.nativeElement, "blur")
                .subscribe(() => {
                    this.addOrRemoveClass(this.hasError);
                });
        }
    }

    ngOnDestroy(): void {
        Object.values(this.statusChangesSubscription).forEach(subscription => subscription.unsubscribe());
    }

    get hasError(): boolean | null {
        const isValid = this.control.invalid;
        this.removeError();

        if (isValid) {
            const msg = getErrorMessage(this.control.errors);
            this.errorElement = this.renderer.createElement("span");
            const text = this.renderer.createText(msg);

            this.renderer.addClass(this.errorElement, "form-error");
            this.renderer.appendChild(this.errorElement, text);

            const parent = this.el.nativeElement.parentNode;
            this.renderer.appendChild(parent, this.errorElement);
        }

        return isValid;
    }

    addOrRemoveClass = (add: boolean | null) => {
        if (add) {
            this.renderer.addClass(this.el.nativeElement, "invalid-control");
        } else {
            this.renderer.removeClass(this.el.nativeElement, "invalid-control");
        }
    };

    private removeError() {
        if (this.errorElement) {
            const parent = this.el.nativeElement.parentNode;
            this.renderer.removeChild(parent, this.errorElement);
            this.errorElement = undefined;
        }
    }
}
