import { PositionModel } from '@adapterOut/userPosition';

export class PositionEntity extends PositionModel {
  private _currentPrice: number;

  constructor(symbol: string, amount: number, currentPrice: number) {
    super(symbol, amount);
    this._currentPrice = currentPrice;
  }

  get currentPrice() {
    return this._currentPrice;
  }
}
