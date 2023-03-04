import { WalletEntity } from '@adapterOut/wallet/wallet.entity';
import { GetItemDTO } from 'domain/dto';

export interface IWalletRepository {
  getWallet(payload: GetItemDTO): Promise<WalletEntity>;
  createWallet(id: string): Promise<WalletEntity>;
  updateWallet(data: WalletEntity): Promise<void>;
}
