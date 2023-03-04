import { UserPositionEntity } from 'domain/entities';

export interface IAccountService {
  getAccountPositions(id: string): Promise<UserPositionEntity>;
  createAccountPositions(id: string): Promise<void>;
}
