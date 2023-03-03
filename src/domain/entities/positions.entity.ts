import { Position } from '@adapterOut/userPosition';

export class PositionEntity extends Position {
  currentPrice: number;

  constructor(symbol: string, amount: number, currentPrice: number) {
    super(symbol, amount);
    this.currentPrice = currentPrice;
  }
}
