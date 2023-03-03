import { UserPositionDocument } from '@adapterOut/userPosition';

export interface IAccountRepository {
  getAccountPositions(id: string): Promise<UserPositionDocument>;
}
