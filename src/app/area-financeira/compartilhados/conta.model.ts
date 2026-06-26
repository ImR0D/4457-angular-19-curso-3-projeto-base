import { TipoBancos } from './tiposBancos.type';

export class Conta {
  constructor(
    public readonly nome: string,
    public readonly saldo: number,
  ) {
    let _name =
      nome.toLowerCase().charAt(0).toUpperCase() +
      nome.substring(1, nome.length);

    TipoBancos.update((tipos) => ({
      ...tipos,
      [_name]: nome,
    }));
  }
}
