export class PositionDTO {
  symbol: string;
  amount: number;
  currentPrice: number;

  constructor(symbol: string, amount: number, currentPrice: number) {
    this.symbol = symbol;
    this.amount = amount;
    this.currentPrice = currentPrice;
  }
}
