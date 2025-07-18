import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputSofkaDirective } from './input-sofka.directive';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { DirectivesModule } from '@app/directives/directives.module';

jest.mock('@app/Utils/errorMessages', () => ({
  getErrorMessage: () => 'This field is required'
}));

@Component({
  imports: [
    ReactiveFormsModule,
    DirectivesModule
  ],
  template: `<input [formControl]="control" appInputSofka/>`
})
class TestHostComponent {
  control = new FormControl('');
}

describe('InputSofkaDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let inputEl: DebugElement;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, TestHostComponent]
    });

    fixture = TestBed.createComponent(TestHostComponent);
    inputEl = fixture.debugElement.query(By.directive(InputSofkaDirective));
    renderer = fixture.componentRef.injector.get(Renderer2);
    fixture.detectChanges();
  });

  it('should apply the "sofka-input-control" class on initialization', () => {
    expect(inputEl.nativeElement.classList.contains('sofka-input-control')).toBe(true);
  });

  it('should apply "invalid-control" class and show error message if field is invalid and touched', () => {
    const control = fixture.componentInstance.control;
    control.markAsTouched();
    control.setValue('');
    control.setErrors({ required: true });

    fixture.detectChanges();

    expect(inputEl.nativeElement.classList.contains('invalid-control')).toBe(true);
    expect(inputEl.nativeElement.parentNode.querySelector('.form-error')).not.toBeNull();
    expect(inputEl.nativeElement.parentNode.querySelector('.form-error')?.textContent)
        .toBe('This field is required');
  });

  it('should remove "invalid-control" class and hide error message when field becomes valid', () => {
    const control = fixture.componentInstance.control;

    control.setErrors({ required: true });
    fixture.detectChanges();

    control.setErrors(null);
    fixture.detectChanges();

    expect(inputEl.nativeElement.classList.contains('invalid-control')).toBe(false);
    expect(inputEl.nativeElement.parentNode.querySelector('.form-error')).toBeNull();
  });

  it('should unsubscribe from statusChanges on directive destruction', () => {
    const directiveInstance = inputEl.injector.get(InputSofkaDirective);
    const unsubscribeSpy = jest.spyOn<any, any>(
        directiveInstance['statusChangesSubscription']['statusChanges'],
        'unsubscribe'
    );

    fixture.destroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
