import { getBDR } from '@application/api/iex.api';
import { StocksEntity } from 'domain/entities';

export const getValues = (symbols: string[]) =>
  Promise.all(symbols.map(symbol => getBDR(symbol))).then(itens =>
    itens.map(
      ({ latestPrice, symbol }: { latestPrice: number; symbol: string }) =>
        new StocksEntity(symbol, latestPrice),
    ),
  );
