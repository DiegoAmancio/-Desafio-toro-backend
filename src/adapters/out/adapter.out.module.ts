import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Providers } from 'domain/enums/providers.enum';
import { UserRepository } from './user';
import { UserPositionModel, UserPositionSchema } from './userPosition';
import { AccountRepository } from './userPosition/userPosition.repository';

const userPositionProvider: Provider = {
  provide: Providers.I_ACCOUNT_REPOSITORY,
  useClass: AccountRepository,
};
const userProvider: Provider = {
  provide: Providers.I_USER_REPOSITORY,
  useClass: UserRepository,
};
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGOOSE_URL),
    MongooseModule.forFeature([
      { name: UserPositionModel.name, schema: UserPositionSchema },
    ]),
  ],
  providers: [userPositionProvider, userProvider],
  exports: [userPositionProvider, userProvider],
})
export class AdapterOutModule {}
