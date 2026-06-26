import { nanoid } from 'nanoid';

export class Transacao {
  public readonly id = nanoid();
  public readonly data: Date | undefined;

  constructor(
    public readonly nome: string,
    public readonly tipo: TipoTransacao,
    public readonly valor: number,
    data: string,
    public readonly conta: string,
  ) {
    if (!data.includes('T:') || !data.includes(' ')) {
      data += 'T00:00';
    }
    this.data = new Date(data);
  }
}

export enum TipoTransacao {
  Deposit = 'Depósito',
  Withdraw = 'Saque',
  Transfer = 'Transferência',
}
