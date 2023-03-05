import { WalletEntity } from '@adapterOut/wallet/wallet.entity';
import {
  validateOrder,
  addOrder,
  getPositionsCurrentValues,
  positionsModelToEntityList,
  mapBDRsToStocksDTO,
  validBDRResponse,
} from '@application/helper';
import { IUserService, IWalletService } from '@application/in';
import { IUserRepository, IWalletRepository } from '@application/out';
import { IIexApi } from '@application/out/iex.interface';
import { Injectable, Logger, Inject, HttpException } from '@nestjs/common';
import {
  DepositDTO,
  OrderPositionDTO,
  PositionDTO,
  WalletDTO,
} from 'domain/dto';
import { StocksDTO } from 'domain/dto/stocks.dto';
import { PK, Providers } from 'domain/enums';

@Injectable()
export class WalletService implements IWalletService {
  private readonly logger = new Logger(WalletService.name);
  constructor(
    @Inject(Providers.I_WALLET_REPOSITORY)
    private readonly walletRepository: IWalletRepository,
    @Inject(Providers.I_IEX_SERVICE)
    private readonly iexAPI: IIexApi,
    @Inject(Providers.I_USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  private getWalletDTOFromEntity = async (wallet: WalletEntity) => {
    const symbolsData = await this.iexAPI.getMultipleBDRs(
      wallet.positions.map(({ symbol }) => symbol),
    );

    const bdrsCurrentValues = getPositionsCurrentValues(symbolsData);

    return new WalletDTO(
      wallet.checkingAccountAmount,
      positionsModelToEntityList(wallet.positions, bdrsCurrentValues),
    );
  };

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

    this.logger.log('validateOrder');

    validateOrder(bdr, orderStock.amount, dynamoWallet.checkingAccountAmount);

    const newPosition = new PositionDTO(
      orderStock.symbol,
      orderStock.amount,
      bdr.latestPrice,
    );

    const wallet = await this.getWalletDTOFromEntity(dynamoWallet);

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

    const dynamoWallet = await this.walletRepository.getWallet({
      PK: PK.WALLET,
      SK: id,
    });

    return this.getWalletDTOFromEntity(dynamoWallet);
  }

  async deposit(deposit: DepositDTO, id: string): Promise<WalletDTO> {
    this.logger.log('deposit user: ' + id);

    const user = await this.userRepository.getUser({ PK: PK.USER, SK: id });

    if (user.Cpf !== deposit.origin.cpf) {
      throw new HttpException('O CPF informado não é mesmo dessa conta', 403);
    }

    const dynamoWallet = await this.walletRepository.getWallet({
      PK: PK.WALLET,
      SK: id,
    });

    dynamoWallet.CheckingAccountAmount =
      dynamoWallet.checkingAccountAmount + deposit.amount;

    await this.walletRepository.updateWallet(dynamoWallet);

    return this.getWalletDTOFromEntity(dynamoWallet);
  }
}
