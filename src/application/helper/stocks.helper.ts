import { HttpException } from '@nestjs/common';
import { StocksDTO } from 'domain/dto/stocks.dto';

export const validBDRResponse = (symbols: string[], itens: any[]) => {
  if (symbols.length !== Object.keys(itens).length) {
    throw new HttpException('Ativos não encontrados', 404);
  }
};
export const mapBDRsToStocksDTO = (
  symbols: { latestPrice: number; symbol: string }[],
) =>
  symbols.map(
    ({ latestPrice, symbol }: { latestPrice: number; symbol: string }) =>
      new StocksDTO(symbol, latestPrice),
  );
