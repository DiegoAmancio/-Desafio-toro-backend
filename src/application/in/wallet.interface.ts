import { DepositDTO, OrderPositionDTO, WalletDTO } from 'domain/dto';
import { StocksDTO } from 'domain/dto/stocks.dto';

export interface IWalletService {
  getWallet(id: string): Promise<WalletDTO>;
  createWallet(id: string): Promise<void>;
  orderStocks(orderStock: OrderPositionDTO, userId: string): Promise<WalletDTO>;
  getTopFiveStocks(): Promise<StocksDTO[]>;
  deposit(deposit: DepositDTO, id: string): Promise<WalletDTO>;
}
