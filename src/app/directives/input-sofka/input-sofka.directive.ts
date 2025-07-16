import {Directive, ElementRef, inject, OnDestroy, OnInit, Optional, Renderer2} from "@angular/core";
import {NgControl} from "@angular/forms";
import {Subscription} from "rxjs";

@Directive({
  selector: "[appInputSofka]",
  standalone: false
})
export class InputSofkaDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  @Optional() private readonly control = inject(NgControl);

  statusChangesSubscription!: Subscription;

  constructor() {}

  ngOnInit(): void {
    if (!this.control) {
      return;
    }

    this.renderer.addClass(this.el.nativeElement, "sofka-input-control");

    if (this.control) {
      this.statusChangesSubscription = this.control.statusChanges!.subscribe(() => {
        const hasError =
            this.control.invalid && (this.control.touched || this.control.dirty);

        if (hasError) {
          this.renderer.addClass(this.el.nativeElement, "invalid-control");
        } else {
          this.renderer.removeClass(this.el.nativeElement, "invalid-control");
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.statusChangesSubscription.unsubscribe();
  }
}
