import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Providers } from 'domain/enums/providers.enum';
import { UserRepository } from './user';
import { WalletRepository } from './wallet/wallet.repository';

const userPositionProvider: Provider = {
  provide: Providers.I_ACCOUNT_REPOSITORY,
  useClass: WalletRepository,
};
const userProvider: Provider = {
  provide: Providers.I_USER_REPOSITORY,
  useClass: UserRepository,
};
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [userPositionProvider, userProvider],
  exports: [userPositionProvider, userProvider],
})
export class AdapterOutModule {}
