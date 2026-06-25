import { nanoid } from 'nanoid';
import { TipoBancos } from './tiposBancos.type';

export class Transacao {
  public readonly id = nanoid();

  constructor(
    public readonly nome: string,
    public readonly tipo: TipoTransacao,
    public readonly valor: number,
    public readonly data: Date,
    public readonly conta: TipoBancos,
  ) {}
}

export enum TipoTransacao {
  Deposit = 'Depósito',
  Withdraw = 'Saque',
  Transfer = 'Transferência',
}
