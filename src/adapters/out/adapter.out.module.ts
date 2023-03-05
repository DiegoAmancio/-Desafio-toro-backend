import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Providers } from 'domain/enums/providers.enum';
import { GoogleService, IexService } from './external';

import { UserRepository } from './user';
import { WalletRepository } from './wallet/wallet.repository';

const userPositionProvider: Provider = {
  provide: Providers.I_WALLET_REPOSITORY,
  useClass: WalletRepository,
};
const userProvider: Provider = {
  provide: Providers.I_USER_REPOSITORY,
  useClass: UserRepository,
};

const googleServiceProvider: Provider = {
  provide: Providers.I_GOOGLE_SERVICE,
  useClass: GoogleService,
};

const iexServiceProvider: Provider = {
  provide: Providers.I_IEX_SERVICE,
  useClass: IexService,
};

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    userPositionProvider,
    userProvider,
    googleServiceProvider,
    iexServiceProvider,
  ],
  exports: [
    userPositionProvider,
    userProvider,
    googleServiceProvider,
    iexServiceProvider,
  ],
})
export class AdapterOutModule {}
