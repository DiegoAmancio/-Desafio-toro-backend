import { ApplicationModule } from '@application/application.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AccountController } from './controllers/account.controller';
import { AuthController } from './controllers/auth.controller';
import { UserInterceptor } from './interceptor/user.interceptor';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ApplicationModule],
  controllers: [AccountController, AuthController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
  ],
})
export class AdapterInModule {}
