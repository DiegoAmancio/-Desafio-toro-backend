export class StocksEntity {
  currentPrice: number;
  symbol: string;
  constructor(symbol: string, currentPrice: number) {
    this.currentPrice = currentPrice;
    this.symbol = symbol;
  }
}
