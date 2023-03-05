import { AdapterOutModule } from '@adapterOut/adapter.out.module';
import { Provider, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Providers } from 'domain/enums';
import { JwtStrategy } from './jwt/jwt.strategy';
import { WalletService, UserService } from './service';
import { AuthService } from './service/auth.service';
import { JwtModule as module } from '@nestjs/jwt';

const accountServiceProvider: Provider = {
  provide: Providers.I_WALLET_SERVICE,
  useClass: WalletService,
};

const authServiceProvider: Provider = {
  provide: Providers.I_AUTH_SERVICE,
  useClass: AuthService,
};

const userServiceProvider: Provider = {
  provide: Providers.I_USER_SERVICE,
  useClass: UserService,
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
    JwtStrategy,
    authServiceProvider,
    userServiceProvider,
  ],
  exports: [
    accountServiceProvider,
    JwtStrategy,
    authServiceProvider,
    userServiceProvider,
  ],
})
export class ApplicationModule {}
