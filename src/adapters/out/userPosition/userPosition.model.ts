import { PositionModel } from './positions.model';

export class UserPositionModel {
  private _checkingAccountAmount: number;
  private _positions: PositionModel[];

  get checkingAccountAmount() {
    return this._checkingAccountAmount;
  }

  get positions() {
    return this._positions;
  }
}
