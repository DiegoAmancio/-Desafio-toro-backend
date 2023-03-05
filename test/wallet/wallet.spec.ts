import { Test, TestingModule } from '@nestjs/testing';
import { IWalletRepository } from '@application/out';
import { WalletService } from '@application/service';

import { PK, Providers } from 'domain/enums';
import {
  createWallet,
  defaultTopFiveWallets,
  getWallet,
  getWalletRepository,
  mockIex,
  successfulGetTopFive,
  successfullOrderUserStock,
  successfulOrderNewStock,
  walletPatternId,
} from './wallet.mock';
import { IIexApi } from '@application/out/iex.interface';
import { HttpException } from '@nestjs/common';

describe('WalletService', () => {
  let service: WalletService;

  const mockRepository: IWalletRepository = {
    getWallet: jest.fn().mockReturnValue(getWalletRepository()),
    createWallet: jest.fn().mockReturnValue(createWallet()),
    updateWallet: jest.fn().mockReturnValue(null),
  };

  const mockIexApi: IIexApi = {
    getBDR: jest.fn().mockReturnValue(mockIex[0]),
    getMultipleBDRs: jest.fn().mockReturnValue(mockIex),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: Providers.I_WALLET_REPOSITORY,
          useValue: mockRepository,
        },
        {
          provide: Providers.I_IEX_SERVICE,
          useValue: mockIexApi,
        },
        WalletService,
      ],
    }).compile();
    service = module.get<WalletService>(WalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('When create wallet', () => {
    it('should be create wallet', async () => {
      await service.createWallet(walletPatternId);

      expect(mockRepository.createWallet).toBeCalledWith(walletPatternId);
    });
  });
  describe('When get wallet', () => {
    it('should be get wallet', async () => {
      const wallet = await service.getWallet(walletPatternId);

      expect(mockRepository.getWallet).toBeCalledWith({
        PK: PK.WALLET,
        SK: walletPatternId,
      });

      expect(wallet).toStrictEqual(getWallet);
    });
  });
  describe('When get top five stocks', () => {
    it('should be get top five stocks with current price', async () => {
      const wallet = await service.getTopFiveStocks();

      expect(mockIexApi.getMultipleBDRs).toBeCalledWith(defaultTopFiveWallets);

      expect(wallet).toStrictEqual(successfulGetTopFive);
    });
    it('should be not get top five stocks', async () => {
      mockIexApi.getMultipleBDRs = jest
        .fn()
        .mockReturnValue([null, ...mockIex]);
      try {
        await service.getTopFiveStocks();
      } catch (error) {
        expect(error).toStrictEqual(
          new HttpException('Ativos não encontrados', 404),
        );
      }
    });
  });
  describe('When order stock', () => {
    it('Should return a exception when does not to find a Author', async () => {
      mockIexApi.getMultipleBDRs = jest.fn().mockReturnValue(mockIex);
      mockRepository.getWallet = jest
        .fn()
        .mockReturnValue(getWalletRepository(150));

      const order = await service.orderStocks(
        { amount: 1, symbol: 'JPM' },
        walletPatternId,
      );

      expect(order).toStrictEqual(successfullOrderUserStock);
    });
    it('Should be order new stock', async () => {
      mockIexApi.getBDR = jest
        .fn()
        .mockReturnValue({ latestPrice: 1, symbol: 'JBR' });

      mockIexApi.getMultipleBDRs = jest.fn().mockReturnValue(mockIex);

      const order = await service.orderStocks(
        { amount: 1, symbol: 'JBR' },
        walletPatternId,
      );

      expect(order).toStrictEqual(successfulOrderNewStock);
    });
    it('should be not order stock, do not have enough checkingAccountAmount', async () => {
      mockIexApi.getBDR = jest.fn().mockReturnValue(null);
      try {
        await service.orderStocks(
          { amount: 1, symbol: 'tte' },
          walletPatternId,
        );
      } catch (error) {
        expect(error.message).toStrictEqual('BDR não encontrado');
      }
    });
    it('should be not order stock, do not have enough checkingAccountAmount', async () => {
      mockRepository.getWallet = jest
        .fn()
        .mockReturnValue(getWalletRepository(0));
      mockIexApi.getBDR = jest
        .fn()
        .mockReturnValue({ latestPrice: 10, symbol: 'JPM' });
      try {
        await service.orderStocks(
          { amount: 1, symbol: 'JPM' },
          walletPatternId,
        );
      } catch (error) {
        expect(error.message).toStrictEqual('Não há saldo disponível');
      }
    });
  });
});
