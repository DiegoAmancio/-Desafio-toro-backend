import {
  UserPositionDocument,
  UserPositionModel,
} from '@adapterOut/userPosition';

export interface IAccountRepository {
  getAccountPositions(id: string): Promise<UserPositionDocument>;
  createAccountPositions(id: string): Promise<UserPositionDocument>;
  updateAccountPositions(id: string, data: UserPositionModel): Promise<void>;
}
