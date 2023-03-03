import { UserPositionEntity } from 'domain/entities';

export interface IAccountService {
  getAccountPositions(id: string): Promise<UserPositionEntity>;
}
