import { IAccountService } from '@application/in';
import { Controller, Get, Inject } from '@nestjs/common';
import { UserPositionEntity } from 'domain/entities';
import { Providers } from 'domain/enums';

@Controller('')
export class UserController {
  constructor(
    @Inject(Providers.I_ACCOUNT_SERVICE)
    private userAccountService: IAccountService,
  ) {}
  @Get()
  findAll(): Promise<UserPositionEntity> {
    return this.userAccountService.getAccountPositions(
      '640154b91def1e19b60f4ca6',
    );
  }
}
