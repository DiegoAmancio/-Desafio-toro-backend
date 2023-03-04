import { Module, Provider } from '@nestjs/common';
import { Providers } from 'domain/enums';
import { AccountService, GoogleService, UserService } from './service';
import { AdapterOutModule } from '@adapterOut/adapter.out.module';
import { JwtModule as module } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthService } from './service/auth.service';

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
  ],
  exports: [
    accountServiceProvider,
    googleServiceProvider,
    JwtStrategy,
    authServiceProvider,
    userServiceProvider,
  ],
})
export class ApplicationModule {}
