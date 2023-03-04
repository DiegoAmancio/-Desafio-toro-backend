import { AdapterOutModule } from '@adapterOut/adapter.out.module';
import { Provider, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Providers } from 'domain/enums';
import { JwtStrategy } from './jwt/jwt.strategy';
import {
  AccountService,
  GoogleService,
  UserService,
  StocksService,
} from './service';
import { AuthService } from './service/auth.service';
import { JwtModule as module } from '@nestjs/jwt';

const accountServiceProvider: Provider = {
  provide: Providers.I_ACCOUNT_SERVICE,
  useClass: AccountService,
};

const googleServiceProvider: Provider = {
  provide: Providers.I_GOOGLE_SERVICE,
  useClass: GoogleService,
};

const authServiceProvider: Provider = {
  provide: Providers.I_AUTH_SERVICE,
  useClass: AuthService,
};

const userServiceProvider: Provider = {
  provide: Providers.I_USER_SERVICE,
  useClass: UserService,
};
const stocksServiceProvider: Provider = {
  provide: Providers.I_STOCKS_SERVICE,
  useClass: StocksService,
};

@Module({
  imports: [
    AdapterOutModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    module.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '36000s' },
    }),
  ],
  providers: [
    accountServiceProvider,
    googleServiceProvider,
    JwtStrategy,
    authServiceProvider,
    userServiceProvider,
    stocksServiceProvider,
  ],
  exports: [
    accountServiceProvider,
    googleServiceProvider,
    JwtStrategy,
    authServiceProvider,
    stocksServiceProvider,
    userServiceProvider,
  ],
})
export class ApplicationModule {}
