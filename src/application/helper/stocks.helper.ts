import { getBDR } from '@application/api/iex.api';
import { HttpException } from '@nestjs/common';
import { StocksDTO } from 'domain/dto/stocks.dto';

const validBDRResponse = (symbols: string[], itens: any[]) => {
  if (symbols.length !== Object.keys(itens).length) {
    throw new HttpException('Ativos não encontrados', 404);
  }
};
export const getValues = (symbols: string[]) =>
  Promise.all(symbols.map(symbol => getBDR(symbol))).then(itens => {
    validBDRResponse(symbols, itens);

    return itens.map(
      ({ latestPrice, symbol }: { latestPrice: number; symbol: string }) =>
        new StocksDTO(symbol, latestPrice),
    );
  });
