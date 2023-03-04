import { OrderPositionDTO } from '@adapterIn/dto';
import { StocksEntity, UserPositionEntity } from 'domain/entities';

export interface IAccountService {
  getAccountPositions(id: string): Promise<UserPositionEntity>;
  createAccountPositions(id: string): Promise<void>;
  orderStocks(
    orderStock: OrderPositionDTO,
    userId: string,
  ): Promise<UserPositionEntity>;
  getTopFiveStocks(): Promise<StocksEntity[]>;
}
