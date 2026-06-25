import {
  afterRender,
  Component,
  ElementRef,
  model,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  modal = viewChild.required<ElementRef<HTMLDialogElement>>('dialogModal');

  open = model(false);

  constructor() {
    afterRender(() => {
      if (this.open()) {
        this.modal().nativeElement.showModal();
      } else {
        this.modal().nativeElement.close();
      }
    });
  }

  onClose() {
    this.open.set(false);
  }
}
