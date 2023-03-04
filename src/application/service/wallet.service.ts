import { WalletEntity } from '@adapterOut/wallet/wallet.entity';
import {
  getValues,
  validateOrder,
  addOrder,
  getPositionsCurrentValues,
  positionsModelToEntityList,
} from '@application/helper';
import { IWalletService } from '@application/in';
import { IWalletRepository } from '@application/out';
import { Injectable, Logger, Inject } from '@nestjs/common';
import { OrderPositionDTO, PositionDTO, WalletDTO } from 'domain/dto';
import { StocksDTO } from 'domain/dto/stocks.dto';
import { PK, Providers } from 'domain/enums';

@Injectable()
export class WalletService implements IWalletService {
  private readonly logger = new Logger(WalletService.name);
  constructor(
    @Inject(Providers.I_ACCOUNT_REPOSITORY)
    private readonly walletRepository: IWalletRepository,
  ) {}
  async getTopFiveStocks(): Promise<StocksDTO[]> {
    this.logger.log('getTopFiveStocks');

    const topFiveStocks = ['JPM', 'GOOGL', 'BRK.B', 'JNJ', 'AAPL'];
    return getValues(topFiveStocks);
  }

  async orderStocks(
    orderStock: OrderPositionDTO,
    userId: string,
  ): Promise<WalletDTO> {
    this.logger.log(`orderStocks ${JSON.stringify(orderStock)} ` + userId);
    const [values, dynamoWallet] = await Promise.all([
      getValues([orderStock.symbol]),
      this.walletRepository.getWallet({
        PK: PK.WALLET,
        SK: userId,
      }),
    ]);

    const { currentPrice } = values[0];

    const newPosition = new PositionDTO(
      orderStock.symbol,
      orderStock.amount,
      currentPrice,
    );
    const wallet = new WalletDTO(
      dynamoWallet.checkingAccountAmount,
      dynamoWallet.positions,
    );

    this.logger.log('validateOrder');

    validateOrder(
      currentPrice,
      orderStock.amount,
      wallet.checkingAccountAmount,
    );

    const updatedWalletDTO = addOrder(newPosition, wallet);

    const updatedWalletDB = Object.assign(new WalletEntity(), dynamoWallet);

    updatedWalletDB.CheckingAccountAmount =
      updatedWalletDTO.checkingAccountAmount;

    updatedWalletDB.Positions = updatedWalletDTO.positions.map(
      ({ amount, symbol }) => ({ amount, symbol }),
    );

    await this.walletRepository.updateWallet(updatedWalletDB);

    return updatedWalletDTO;
  }

  async createWallet(id: string): Promise<void> {
    this.logger.log(`createWallet ${id}`);
    await this.walletRepository.createWallet(id);
  }

  async getWallet(id: string): Promise<WalletDTO> {
    this.logger.log(`getWallet ${id}`);

    const accountPosition = await this.walletRepository.getWallet({
      PK: PK.WALLET,
      SK: id,
    });

    const positionsCurrentValues = await getPositionsCurrentValues(
      accountPosition.positions.map(({ symbol }) => symbol),
    );

    return new WalletDTO(
      accountPosition.checkingAccountAmount,
      positionsModelToEntityList(
        accountPosition.positions,
        positionsCurrentValues,
      ),
    );
  }

  async createAccountPosition(id: string) {
    this.logger.log(`getWallet ${id}`);

    const accountPosition = await this.walletRepository.getWallet({
      PK: PK.WALLET,
      SK: id,
    });

    const positionsCurrentValues = await getPositionsCurrentValues(
      accountPosition.positions.map(({ symbol }) => symbol),
    );

    return new WalletDTO(
      accountPosition.checkingAccountAmount,
      positionsModelToEntityList(
        accountPosition.positions,
        positionsCurrentValues,
      ),
    );
  }
}
