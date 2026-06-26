import { Component, signal } from '@angular/core';
import { BotaoComponent } from '../../../compartilhados/botao/botao.component';
import { ModalComponent } from '../../../compartilhados/modal/modal.component';

@Component({
  selector: 'app-botao-adicionar-conta',
  imports: [BotaoComponent, ModalComponent],
  templateUrl: './botao-adicionar-conta.component.html',
  styleUrl: './botao-adicionar-conta.component.css',
})
export class BotaoAdicionarContaComponent {
  openModal = signal(false);

  openModalDialog() {
    this.openModal.set(true);
  }
}
