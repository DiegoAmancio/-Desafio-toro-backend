import { ApplicationModule } from '@application/application.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthController } from './controllers/auth.controller';
import { WalletController } from './controllers/wallet.controller';
import { UserInterceptor } from './interceptor/user.interceptor';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ApplicationModule],
  controllers: [WalletController, AuthController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
  ],
})
export class AdapterInModule {}
