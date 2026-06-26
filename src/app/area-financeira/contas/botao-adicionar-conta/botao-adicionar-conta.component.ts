import { Component, output, signal } from '@angular/core';
import { BotaoComponent } from '../../../compartilhados/botao/botao.component';
import { ModalComponent } from '../../../compartilhados/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { Conta } from '../../compartilhados/conta.model';

@Component({
  selector: 'app-botao-adicionar-conta',
  imports: [BotaoComponent, ModalComponent, FormsModule],
  templateUrl: './botao-adicionar-conta.component.html',
  styleUrl: './botao-adicionar-conta.component.css',
})
export class BotaoAdicionarContaComponent {
  openModal = signal(false);
  accountBank = output<Conta>();

  objetoCriarConta = {
    nome: '',
    saldo: '',
  };

  openModalDialog() {
    this.openModal.set(true);
  }

  submitAccount() {
    const formAccount = new Conta(
      this.objetoCriarConta.nome,
      Number(this.objetoCriarConta.saldo),
    );
    this.accountBank.emit(formAccount);
    this.openModal.set(false);
    this.objetoCriarConta.nome = '';
    this.objetoCriarConta.saldo = '';
  }
}
