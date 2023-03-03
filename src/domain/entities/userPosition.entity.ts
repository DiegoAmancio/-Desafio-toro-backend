import { PositionEntity } from './positions.entity';

export class UserPositionEntity {
  checkingAccountAmount: number;
  positions: PositionEntity[];
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
