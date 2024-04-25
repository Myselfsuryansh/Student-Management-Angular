import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCapitalizeInput]'
})
export class CapitalizeInputDirective {

  constructor(private el: ElementRef) { }

  @HostListener('keyup', ['$event']) onKeyUp(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
  }
}
