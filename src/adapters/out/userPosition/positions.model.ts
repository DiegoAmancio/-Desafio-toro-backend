export class PositionModel {
  private _symbol: string;
  private _amount: number;

  constructor(symbol: string, amount: number) {
    this._symbol = symbol;
    this._amount = amount;
  }

  get symbol() {
    return this._symbol;
  }

  get amount() {
    return this._amount;
  }
}
