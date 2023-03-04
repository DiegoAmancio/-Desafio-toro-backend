import { UserDocument } from '@adapterOut/user';
import { IUserService } from '@application/in';

import { IUserRepository } from '@application/out';
import { Injectable, Logger, Inject } from '@nestjs/common';

import { Providers } from 'domain/enums';

@Injectable()
export class UserService implements IUserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @Inject(Providers.I_USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}
  createUser(id: string, name: string, email: string): Promise<UserDocument> {
    this.logger.log(`createUser ${id}`);

    return this.userRepository.createUser(id, name, email);
  }
  getUser(id: string): Promise<UserDocument> {
    this.logger.log(`getUser ${id}`);

    return this.userRepository.getUser(id);
  }
}
