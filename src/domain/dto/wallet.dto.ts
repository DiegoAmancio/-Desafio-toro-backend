import { PositionDTO } from './position.dto';

export class WalletDTO {
  checkingAccountAmount: number;
  positions: PositionDTO[];
  consolidated: number;

  constructor(checkingAccountAmount = 0, positions = []) {
    this.checkingAccountAmount = checkingAccountAmount;
    this.positions = positions;

    this.calculateConsolidated();
  }

  private calculateConsolidated() {
    this.consolidated =
      this.checkingAccountAmount +
      this.positions.reduce(
        (count, { amount, currentPrice }) => count + amount * currentPrice,
        0,
      );
  }
}
