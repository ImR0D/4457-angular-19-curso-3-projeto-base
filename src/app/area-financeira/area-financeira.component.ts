import { Component, computed, signal } from '@angular/core';
import { SaldoComponent } from './saldo/saldo.component';
import { TransacoesComponent } from './transacoes/transacoes.component';
import { ContasComponent } from './contas/contas.component';
import { Conta } from './compartilhados/conta.model';
import { Transacao, TipoTransacao } from './compartilhados/transacao.model';

@Component({
  selector: 'app-area-financeira',
  imports: [SaldoComponent, TransacoesComponent, ContasComponent],
  templateUrl: './area-financeira.component.html',
  styleUrl: './area-financeira.component.css',
})
export class AreaFinanceiraComponent {
  saldo = 0;

  transacoes = signal<Transacao[]>([]);
  contasComSaldoInicial = signal<Conta[]>([]);

  contas = computed(() => {
    return this.contasComSaldoInicial().map((conta) => {
      const atualizaSaldo = this.calculaSaldoAtualizado(conta);
      return { ...conta, saldo: atualizaSaldo };
    });
  });

  processarTransacao(transaction: Transacao) {
    if (
      transaction.valor > Number(this.contas) &&
      transaction.tipo != TipoTransacao.Deposit
    ) {
      throw new Error('Saldo insuficiente para realizar a transação');
    }
    this.transacoes.update((transacoes) => [transaction, ...transacoes]);
  }
  adicionarConta(conta: Conta) {
    this.contasComSaldoInicial.update((contas) => [conta, ...contas]);
  }
  calculaSaldoAtualizado(contaInicial: Conta) {
    const transacoesDaConta = this.transacoes().filter((transacao) => {
      return transacao.conta === contaInicial.nome;
    });
    const saldoAtualizado = transacoesDaConta.reduce(
      (acumulador, transacao) => {
        switch (transacao.tipo) {
          case TipoTransacao.Deposit:
            return acumulador + transacao.valor;
          case TipoTransacao.Transfer:
          case TipoTransacao.Withdraw:
            return acumulador - transacao.valor;
          default:
            transacao.tipo satisfies never;
            throw new Error('Tipo de transação não identificado.');
        }
      },
      contaInicial.saldo,
    );

    return saldoAtualizado;
  }
}
