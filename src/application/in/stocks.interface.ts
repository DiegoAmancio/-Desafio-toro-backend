import { StocksEntity } from 'domain/entities';

export interface IStocksService {
  getTopFiveStocks(): Promise<StocksEntity[]>;
}
