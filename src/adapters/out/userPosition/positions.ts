import { Prop } from '@nestjs/mongoose';

export class Position {
  @Prop()
  symbol: string;
  @Prop()
  amount: number;

  constructor(symbol: string, amount: number) {
    this.symbol = symbol;
    this.amount = amount;
  }
}
