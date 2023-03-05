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

const mockLatestPrice = (list: Position[]) =>
  list.map(({ amount, symbol }, index) => ({
    latestPrice: amount * (index + 1),
    symbol,
  }));
export const mockIex = mockLatestPrice(defaultWalletItens);

export const successfulGetTopFive = mapBDRsToStocksDTO(mockIex);

export const getWalletRepository = (checkingAccountAmount = 0) => {
  const wallet = new WalletEntity();
  wallet.fill(walletPatternId);
  wallet.Positions = defaultWalletItens;
  wallet.CheckingAccountAmount = checkingAccountAmount;
  return wallet;
};

export const getWallet = new WalletDTO(
  0,
  defaultWalletItens.map(
    ({ amount, symbol }, index) =>
      new PositionDTO(symbol, amount, amount * (index + 1)),
  ),
);

export const successfullOrderUserStock = new WalletDTO(140, [
  new PositionDTO('JPM', 11, 10),
  new PositionDTO('GOOGL', 10, 20),
  new PositionDTO('BRK.B', 10, 30),
  new PositionDTO('JNJ', 10, 40),
  new PositionDTO('AAPL', 10, 50),
]);

export const successfulOrderNewStock = new WalletDTO(149, [
  new PositionDTO('JPM', 10, 10),
  new PositionDTO('GOOGL', 10, 20),
  new PositionDTO('BRK.B', 10, 30),
  new PositionDTO('JNJ', 10, 40),
  new PositionDTO('AAPL', 10, 50),
  new PositionDTO('JBR', 1, 1),
]);
