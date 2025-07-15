import {Directive, ElementRef, inject, OnInit, Optional, Renderer2} from "@angular/core";
import {NgControl} from "@angular/forms";

@Directive({
  selector: "[appInputSofka]",
  standalone: false
})
export class InputSofkaDirective implements OnInit {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  @Optional() private readonly control = inject(NgControl);

  constructor() {}

  ngOnInit(): void {
    if (!this.control) {
      return;
    }

    this.renderer.addClass(this.el.nativeElement, "sofka-input-control");

    this.control.statusChanges?.subscribe(() => {
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
