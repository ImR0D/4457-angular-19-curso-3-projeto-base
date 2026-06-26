import { Component, signal } from '@angular/core';
import { BotaoComponent } from '../../../compartilhados/botao/botao.component';
import { ModalComponent } from '../../../compartilhados/modal/modal.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { KeyValuePipe, TitleCasePipe } from '@angular/common';
import { TipoBancos } from '../../compartilhados/tiposBancos.type';
import { TipoTransacao, Transacao } from '../../compartilhados/transacao.model';

@Component({
  selector: 'app-botao-adicionar-transacao',
  imports: [
    BotaoComponent,
    ModalComponent,
    ReactiveFormsModule,
    KeyValuePipe,
    TitleCasePipe,
  ],
  templateUrl: './botao-adicionar-transacao.component.html',
  styleUrl: './botao-adicionar-transacao.component.css',
})
export class BotaoAdicionarTransacaoComponent {
  openModal = signal(false);
  bankTypes = TipoBancos;
  transactionTypes = TipoTransacao;

  formTransaction = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    value: new FormControl('', [Validators.min(0.01), Validators.required]),
    creationDate: new FormControl('', [
      Validators.required,
      // Formatos de data que são aceitados pelo regexp:
      // Formato americano: 'yyyy/MM/dd'; 'yy-MM-dd'; 'yyyy/MM/dd', 'yy-MM-dd'
      // Formato brasileiro/outros: 'dd/MM/yyyy'; 'dd-MM-yyyy'; 'dd/MM/yy', 'dd-MM-yy'
      Validators.pattern(/^\d{1,4}[(\/\-)]\d{1,2}[(\/\-)]\d{1,4}$/),
    ]),
    accountBankType: new FormControl('', Validators.required),
  });

  openModalDialog() {
    this.openModal.set(true);
  }

  submitForm() {
    const dados = this.formTransaction.value;
    const dadosEnviados: Transacao = new Transacao(
      dados.name as string,
      dados.type as TipoTransacao,
      Number(dados.value),
      dados.creationDate as string,
      dados.accountBankType as TipoBancos,
    );

    if (this.formTransaction.valid) {
      console.log('Dados capturados com sucesso:', dadosEnviados);

      this.openModal.set(false);
      this.formTransaction.reset({
        name: '',
        type: '',
        value: '',
        creationDate: '',
        accountBankType: '',
      });
    }
  }
}
