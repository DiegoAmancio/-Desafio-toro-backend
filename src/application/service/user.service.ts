import { IUserService, IAccountService } from '@application/in';
import { IUserRepository } from '@application/out';
import { Injectable, Logger, Inject } from '@nestjs/common';
import { CreateUserDTO, GetUserDTO } from 'domain/dto';
import { UserEntity } from '@adapterOut/user';
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
  async createUser(payload: CreateUserDTO): Promise<void> {
    this.logger.log(`createUser ${payload.id}`);

    await this.userRepository.createUser(payload);

    await this.accountService.createAccountPositions(payload.id);
  }
  getUser(payload: GetUserDTO): Promise<UserEntity> {
    this.logger.log('getUser');

    return this.userRepository.getUser(payload);
  }
}
