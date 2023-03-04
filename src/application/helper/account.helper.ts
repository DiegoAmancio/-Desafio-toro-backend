import { Position } from '@adapterOut/userPosition';
import { getBDR } from '@application/api/iex.api';
import { HttpException } from '@nestjs/common';
import { PositionEntity, UserPositionEntity } from 'domain/entities';

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

export const validateOrder = (
  currentPrice: number,
  amount: number,
  checkingAccountAmount: number,
) => {
  const price = currentPrice * amount;
  if (checkingAccountAmount - price < 0) {
    throw new HttpException('Não há saldo disponível', 400);
  }
};
const addPosition = (
  newPosition: PositionEntity,
  accountPosition: UserPositionEntity,
) => {
  const exist = accountPosition.positions.some(
    position => position.symbol === newPosition.symbol,
  );

  const updatedPositions = exist
    ? accountPosition.positions.map(position => {
        if (position.symbol === newPosition.symbol) {
          position.amount += newPosition.amount;
        }
        return position;
      })
    : accountPosition.positions.concat([newPosition]);

  return new UserPositionEntity(
    accountPosition.checkingAccountAmount,
    updatedPositions,
  );
};
export const addOrder = (
  newPosition: PositionEntity,
  accountPosition: UserPositionEntity,
) => {
  const price = newPosition.currentPrice * newPosition.amount;

  const newAccountPosition = new UserPositionEntity(
    accountPosition.checkingAccountAmount - price,
    accountPosition.positions,
  );

  return addPosition(newPosition, newAccountPosition);
};
