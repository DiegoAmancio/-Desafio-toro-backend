import { AdapterOutModule } from '@adapterOut/adapter.out.module';
import { Module, Provider } from '@nestjs/common';
import { Providers } from 'domain/enums';
import { AccountService } from './service/account.service';

const accountServiceProvider: Provider = {
  provide: Providers.I_ACCOUNT_SERVICE,
  useClass: AccountService,
};
@Module({
  imports: [AdapterOutModule],
  providers: [accountServiceProvider],
  exports: [accountServiceProvider],
})
export class ApplicationModule {}
