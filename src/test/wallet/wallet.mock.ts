import { Position } from '@adapterOut/wallet/position';
import { WalletEntity } from '@adapterOut/wallet/wallet.entity';
import { mapBDRsToStocksDTO } from '@application/helper';
import { PositionDTO, WalletDTO } from 'domain/dto';

export const walletPatternId = '2134';
export const createWallet = () => {
  const wallet = new WalletEntity();
  wallet.fill(walletPatternId);
  return wallet;
};
const defaultWalletItens = [
  new Position('JPM', 10),
  new Position('GOOGL', 10),
  new Position('BRK.B', 10),
  new Position('JNJ', 10),
  new Position('AAPL', 10),
];

export const defaultTopFiveWallets = ['JPM', 'GOOGL', 'BRK.B', 'JNJ', 'AAPL'];
export const mockIex = defaultWalletItens.map(({ amount, symbol }, index) => ({
  latestPrice: amount * index + 1,
  symbol,
}));
export const successfulGetTopFive = mapBDRsToStocksDTO(mockIex);

export const getWalletRepository = () => {
  const wallet = new WalletEntity();
  wallet.fill(walletPatternId);
  wallet.Positions = defaultWalletItens;

  return wallet;
};
export const getWallet = new WalletDTO(
  0,
  defaultWalletItens.map(
    ({ amount, symbol }, index) =>
      new PositionDTO(symbol, amount, amount * index + 1),
  ),
);
