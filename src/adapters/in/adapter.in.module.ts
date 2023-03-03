import { ApplicationModule } from '@application/application.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ApplicationModule],
  controllers: [UserController],
  providers: [],
})
export class AdapterInModule {}
