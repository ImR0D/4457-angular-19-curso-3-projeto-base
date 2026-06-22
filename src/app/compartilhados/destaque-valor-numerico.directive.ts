import { afterRender, Directive, ElementRef, input } from '@angular/core';

@Directive({
  selector: '[appDestaqueValorNumerico]',
})
export class DestaqueValorNumericoDirective {
  appDestaqueValorNumerico = input.required<number>();
  corPositiva = input('var(--destaque-receita)');
  corNegativa = input('var(--destaque-despesa)');

  constructor(element: ElementRef<HTMLElement>) {
    afterRender(() => {
      if (this.appDestaqueValorNumerico() > 0) {
        element.nativeElement.style.color = this.corPositiva();
      } else if (this.appDestaqueValorNumerico() < 0) {
        element.nativeElement.style.color = this.corNegativa();
      }
    });
  }
}
