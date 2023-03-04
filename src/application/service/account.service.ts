import { OrderPositionDTO } from '@adapterIn/dto';
import {
  addOrder,
  getPositionsCurrentValues,
  getValues,
  positionsModelToEntityList,
  validateOrder,
} from '@application/helper';
import { IAccountService } from '@application/in';
import { IAccountRepository } from '@application/out';
import { Injectable, Logger, Inject } from '@nestjs/common';
import {
  PositionEntity,
  StocksEntity,
  UserPositionEntity,
} from 'domain/entities';
import { Providers } from 'domain/enums';

@Injectable()
export class AccountService implements IAccountService {
  private readonly logger = new Logger(AccountService.name);
  constructor(
    @Inject(Providers.I_ACCOUNT_REPOSITORY)
    private readonly accountRepository: IAccountRepository,
  ) {}
  async getTopFiveStocks(): Promise<StocksEntity[]> {
    this.logger.log('getTopFiveStocks');

    const topFiveStocks = ['JPM', 'GOOGL', 'BRK.B', 'JNJ', 'AAPL'];
    return getValues(topFiveStocks);
  }

  async orderStocks(
    orderStock: OrderPositionDTO,
    userId: string,
  ): Promise<UserPositionEntity> {
    this.logger.log(`orderStocks ${JSON.stringify(orderStock)} ` + userId);
    const [values, accountPositionDB] = await Promise.all([
      getValues([orderStock.symbol]),
      this.accountRepository.getAccountPositions(userId),
    ]);

    const { currentPrice } = values[0];

    const newPosition = new PositionEntity(
      orderStock.symbol,
      orderStock.amount,
      currentPrice,
    );
    const accountPosition = new UserPositionEntity(
      accountPositionDB.checkingAccountAmount,
      accountPositionDB.positions,
    );

    this.logger.log('validateOrder');

    validateOrder(
      currentPrice,
      orderStock.amount,
      accountPosition.checkingAccountAmount,
    );

    const updatedAccount = addOrder(newPosition, accountPosition);

    await this.accountRepository.updateAccountPositions(accountPositionDB.id, {
      checkingAccountAmount: updatedAccount.checkingAccountAmount,
      positions: updatedAccount.positions,
      user: accountPositionDB.user,
    });

    return updatedAccount;
  }

  async createAccountPositions(id: string): Promise<void> {
    this.logger.log(`getAccountPositions ${id}`);
    await this.accountRepository.createAccountPositions(id);
  }

  async getAccountPositions(id: string): Promise<UserPositionEntity> {
    this.logger.log(`getAccountPositions ${id}`);

    const accountPosition = await this.accountRepository.getAccountPositions(
      id,
    );

    const positionsCurrentValues = await getPositionsCurrentValues(
      accountPosition.positions.map(({ symbol }) => symbol),
    );

    return new UserPositionEntity(
      accountPosition.checkingAccountAmount,
      positionsModelToEntityList(
        accountPosition.positions,
        positionsCurrentValues,
      ),
    );
  }

  async createAccountPosition(id: string) {
    this.logger.log(`getAccountPositions ${id}`);

    const accountPosition = await this.accountRepository.getAccountPositions(
      id,
    );

    const positionsCurrentValues = await getPositionsCurrentValues(
      accountPosition.positions.map(({ symbol }) => symbol),
    );

    return new UserPositionEntity(
      accountPosition.checkingAccountAmount,
      positionsModelToEntityList(
        accountPosition.positions,
        positionsCurrentValues,
      ),
    );
  }
}
