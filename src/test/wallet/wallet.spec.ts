import { Test, TestingModule } from '@nestjs/testing';
import { IWalletRepository } from '@application/out';
import { WalletService } from '@application/service';

import { PK, Providers } from 'domain/enums';
import {
  createWallet,
  getWallet,
  getWalletRepository,
  mockIex,
  walletPatternId,
} from './wallet.mock';
import { IIexApi } from '@application/out/iex.interface';
// getAuthor: jest.fn().mockReturnValue(null),
// createAndSaveAuthor: jest.fn().mockReturnValue(authorMock),
// updateAuthor: jest.fn().mockReturnValue(true),
// deleteAuthor: jest.fn().mockReturnValue(true),
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
          provide: Providers.I_ACCOUNT_REPOSITORY,
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
  // describe('When get Author', () => {
  //   it('should be get Author by id', async () => {
  //     const author = await service.getAuthor(authorMock.id);

  //     expect(mockRepository.getAuthor).toBeCalledWith(authorMock.id);
  //     expect(author).toStrictEqual(getAuthorMock);
  //   });
  //   it('Should return a exception when does not to find a Author', async () => {
  //     mockRepository.getAuthor.mockReturnValue(null);

  //     const Author = service.getAuthor(authorMock.id);

  //     expect(mockRepository.getAuthor).toHaveBeenCalledWith(authorMock.id);
  //     expect(Author).rejects.toThrow(NotFoundException);
  //   });
  // });
  // describe('When update Author', () => {
  //   it('Should update a Author', async () => {
  //     mockRepository.getAuthor.mockReturnValue(authorMock);

  //     const authorUpdated = await service.updateAuthor(updateAuthorData);

  //     expect(mockRepository.getAuthor).toHaveBeenCalledWith(
  //       updateAuthorData.id,
  //     );
  //     expect(mockRepository.updateAuthor).toHaveBeenCalledWith(authorMock);
  //     expect(authorUpdated).toBe('Author updated');
  //   });
  // });
  // describe('When delete Author', () => {
  //   it('Should delete Author', async () => {
  //     mockRepository.getAuthor.mockReturnValue(getAuthorMock);

  //     const authorDeleted = await service.deleteAuthor(authorMock.id);

  //     expect(mockRepository.getAuthor).toHaveBeenCalledWith(authorMock.id);
  //     expect(mockRepository.deleteAuthor).toHaveBeenCalledWith(authorMock.id);
  //     expect(authorDeleted).toBe(true);
  //   });
  //   it('Should return a exception when atempt delete Author not register', async () => {
  //     mockRepository.getAuthor.mockReturnValue(null);

  //     const authorDeleted = service.deleteAuthor('213');
  //     expect(authorDeleted).rejects.toThrow(NotFoundException);
  //   });
  // });
});
