import { Position } from '@adapterOut/userPosition';
import { getBDR } from '@application/api/iex.api';
import { PositionEntity } from 'domain/entities';

export const accumulateConsolidated = (positions: PositionEntity[]) =>
  positions.reduce((count, { currentPrice }) => count + currentPrice, 0);

export const getPositionsCurrentValues = async (
  symbols: string[],
): Promise<any> => {
  const bdrs = await Promise.all(symbols.map(symbol => getBDR(symbol)));

  return bdrs.reduce(
    (
      accumulate,
      { latestPrice, symbol }: { latestPrice: number; symbol: string },
    ) => {
      accumulate[symbol] = latestPrice;

      return accumulate;
    },
    {},
  );
};

export const positionsModelToEntityList = (
  positionsModel: Position[],
  positionsCurrentValues: any,
) =>
  positionsModel.map(({ symbol, amount }) => {
    const currentPrice = positionsCurrentValues[symbol];

    return new PositionEntity(symbol, amount, currentPrice);
  });
