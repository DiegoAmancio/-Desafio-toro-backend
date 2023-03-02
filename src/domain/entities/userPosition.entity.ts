import { PositionEntity } from './positions.entity';

export class UserPosition {
  private _checkingAccountAmount: number;
  private _positions: PositionEntity[];
  private _consolidated: number;

  constructor(checkingAccountAmount = 0, positions = []) {
    this._checkingAccountAmount = checkingAccountAmount;
    this._positions = positions;
    this.calculateConsolidated();
  }

  get checkingAccountAmount() {
    return this._checkingAccountAmount;
  }

  get positions() {
    return this._positions;
  }

  get consolidated() {
    return this._consolidated;
  }

  private calculateConsolidated() {
    this._consolidated = this.positions.reduce(
      (count, { amount, currentPrice }) => count + amount * currentPrice,
      0,
    );
  }
}
