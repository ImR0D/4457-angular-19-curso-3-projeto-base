import { Component, signal } from '@angular/core';
import { SaldoComponent } from './saldo/saldo.component';
import { TransacoesComponent } from './transacoes/transacoes.component';
import { ContasComponent } from './contas/contas.component';
import { Conta } from './compartilhados/conta.model';
import { Transacao, TipoTransacao } from './compartilhados/transacao.model';
import { TipoBancos } from './compartilhados/tiposBancos.type';

@Component({
  selector: 'app-area-financeira',
  imports: [SaldoComponent, TransacoesComponent, ContasComponent],
  templateUrl: './area-financeira.component.html',
  styleUrl: './area-financeira.component.css',
})
export class AreaFinanceiraComponent {
  saldo = 0;

  transacoes = signal<Transacao[]>([
    {
      id: '5',
      nome: '',
      tipo: TipoTransacao.Withdraw,
      valor: 200,
      data: new Date('2025-02-20T00:00'),
      conta: 'SwitchBank',
    },
    {
      id: '4',
      nome: 'Almoço',
      tipo: TipoTransacao.Withdraw,
      valor: 40,
      data: new Date('2025-01-15T00:00'),
      conta: 'Bytebank',
    },
    {
      id: '3',
      nome: '',
      tipo: TipoTransacao.Deposit,
      valor: 400,
      data: new Date('2025-01-10T00:00'),
      conta: 'Bytebank',
    },
    {
      id: '2',
      nome: 'Freela (2ª parte)',
      tipo: TipoTransacao.Deposit,
      valor: 200,
      data: new Date('2024-10-01T00:00'),
      conta: 'Anybank',
    },
    {
      id: '1',
      nome: 'Freela (1ª parte)',
      tipo: TipoTransacao.Deposit,
      valor: 100,
      data: new Date('2024-10-01T00:00'),
      conta: 'Anybank',
    },
  ]);

  contas = signal<Conta[]>([
    {
      nome: 'Anybank',
      saldo: 1000,
    },
    {
      nome: 'Bytebank',
      saldo: 0,
    },
    {
      nome: 'Switch Bank',
      saldo: 0,
    },
  ]);

  processarTransacao(transaction: Transacao) {
    this.transacoes.update((transacoes) => [transaction, ...transacoes]);
  }
  adicionarConta(conta: Conta) {
    this.contas.update((contas) => [conta, ...contas]);
  }
}
