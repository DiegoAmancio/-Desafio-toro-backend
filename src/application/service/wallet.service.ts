import { WalletEntity } from '@adapterOut/wallet/wallet.entity';
import {
  validateOrder,
  addOrder,
  getPositionsCurrentValues,
  positionsModelToEntityList,
  mapBDRsToStocksDTO,
  validBDRResponse,
} from '@application/helper';
import { IWalletService } from '@application/in';
import { IWalletRepository } from '@application/out';
import { IIexApi } from '@application/out/iex.interface';
import { Injectable, Logger, Inject, HttpException } from '@nestjs/common';
import { OrderPositionDTO, PositionDTO, WalletDTO } from 'domain/dto';
import { StocksDTO } from 'domain/dto/stocks.dto';
import { PK, Providers } from 'domain/enums';

@Injectable()
export class WalletService implements IWalletService {
  private readonly logger = new Logger(WalletService.name);
  constructor(
    @Inject(Providers.I_ACCOUNT_REPOSITORY)
    private readonly walletRepository: IWalletRepository,
    @Inject(Providers.I_IEX_SERVICE)
    private readonly iexAPI: IIexApi,
  ) {}
  async getTopFiveStocks(): Promise<StocksDTO[]> {
    this.logger.log('getTopFiveStocks');

    const topFiveStocks = ['JPM', 'GOOGL', 'BRK.B', 'JNJ', 'AAPL'];

    const bdrs = await this.iexAPI.getMultipleBDRs(topFiveStocks);

    validBDRResponse(bdrs);

    return mapBDRsToStocksDTO(bdrs);
  }

  async orderStocks(
    orderStock: OrderPositionDTO,
    userId: string,
  ): Promise<WalletDTO> {
    this.logger.log(`orderStocks ${JSON.stringify(orderStock)} ` + userId);
    const [bdr, dynamoWallet] = await Promise.all([
      this.iexAPI.getBDR(orderStock.symbol),
      this.walletRepository.getWallet({
        PK: PK.WALLET,
        SK: userId,
      }),
    ]);

    if (!bdr) {
      throw new HttpException('BDR não encontrado', 404);
    }

    const newPosition = new PositionDTO(
      orderStock.symbol,
      orderStock.amount,
      bdr.currentPrice,
    );
    const wallet = new WalletDTO(
      dynamoWallet.checkingAccountAmount,
      dynamoWallet.positions,
    );

    this.logger.log('validateOrder');

    validateOrder(
      bdr.currentPrice,
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

    const symbolsData = await this.iexAPI.getMultipleBDRs(
      accountPosition.positions.map(({ symbol }) => symbol),
    );

    const positionsCurrentValues = await getPositionsCurrentValues(symbolsData);

    return new WalletDTO(
      accountPosition.checkingAccountAmount,
      positionsModelToEntityList(
        accountPosition.positions,
        positionsCurrentValues,
      ),
    );
  }
}
