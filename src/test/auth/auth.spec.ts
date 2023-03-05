import { Test, TestingModule } from '@nestjs/testing';
import { IGoogleApi, IUserRepository } from '@application/out';
import { UserService, WalletService } from '@application/service';

import { Providers } from 'domain/enums';
import { createUser, email, name, userId } from './auth.mock';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '@application/service/auth.service';
import { createWallet } from 'test/wallet/wallet.mock';
import { IIexApi } from '@application/out/iex.interface';

describe('AuthService', () => {
  let service: AuthService;

  const mockRepository: IUserRepository = {
    createUser: jest.fn().mockReturnValue(null),
    getUser: jest.fn().mockReturnValue(
      new Promise(resolve => {
        resolve(createUser());
      }),
    ),
  };

  const mockJWT = {
    decode: jest.fn().mockReturnValue({
      email,
      id: userId,
      name,
    }),
    sign: jest.fn().mockReturnValue('top'),
  };

  const mockGoogleApi: IGoogleApi = {
    getUserByToken: jest.fn().mockReturnValue({ id: userId, email, name }),
  };

  const mockWalletRepository = {
    createWallet: jest.fn().mockReturnValue(createWallet()),
  };

  const mockIex: IIexApi = {
    getBDR: jest.fn().mockReturnValue(null),
    getMultipleBDRs: jest.fn().mockReturnValue(null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: JwtService,
          useValue: mockJWT,
        },
        {
          provide: Providers.I_USER_REPOSITORY,
          useValue: mockRepository,
        },
        {
          provide: Providers.I_USER_SERVICE,
          useClass: UserService,
        },
        {
          provide: Providers.I_GOOGLE_SERVICE,
          useValue: mockGoogleApi,
        },
        {
          provide: Providers.I_WALLET_REPOSITORY,
          useValue: mockWalletRepository,
        },
        {
          provide: Providers.I_WALLET_SERVICE,
          useClass: WalletService,
        },
        {
          provide: Providers.I_IEX_SERVICE,
          useValue: mockIex,
        },
        AuthService,
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When login', () => {
    it('should be login in system', async () => {
      const user = await service.login('topado');

      expect(mockGoogleApi.getUserByToken).toBeCalledWith('topado');

      expect(user).toStrictEqual({
        access_token: 'top',
        name,
      });
    });
    it('should be login in system', async () => {
      mockRepository.getUser = jest.fn().mockReturnValue(
        new Promise((_resolve, reject) => {
          reject(null);
        }),
      );
      const user = await service.login('topado');

      expect(mockGoogleApi.getUserByToken).toBeCalledWith('topado');
      expect(mockRepository.createUser).toBeCalledWith({
        email,
        id: userId,
        name,
      });

      expect(user).toStrictEqual({
        access_token: 'top',
        name,
      });
    });
  });
  describe('When decode token', () => {
    it('should be get information from token', () => {
      const information = service.getUserByToken('topado');

      expect(information).toStrictEqual({
        email,
        id: userId,
        name,
      });
    });
  });
});
