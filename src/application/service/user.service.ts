import { UserDocument } from '@adapterOut/user';
import { IAccountService, IUserService } from '@application/in';

import { IUserRepository } from '@application/out';
import { Injectable, Logger, Inject } from '@nestjs/common';

import { Providers } from 'domain/enums';

@Injectable()
export class UserService implements IUserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @Inject(Providers.I_USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(Providers.I_ACCOUNT_SERVICE)
    private readonly accountService: IAccountService,
  ) {}
  async createUser(
    id: string,
    name: string,
    email: string,
  ): Promise<UserDocument> {
    this.logger.log(`createUser ${id}`);

    const user = await this.userRepository.createUser(id, name, email);

    await this.accountService.createAccountPositions(user.id);

    return user;
  }
  getUser(id: string): Promise<UserDocument> {
    this.logger.log(`getUser ${id}`);

    return this.userRepository.getUser(id);
  }
}
