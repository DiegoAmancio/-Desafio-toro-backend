import { IAccountService } from '@application/in';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { UserPositionEntity } from 'domain/entities';
import { Providers } from 'domain/enums';

@Controller('')
export class UserController {
  constructor(
    @Inject(Providers.I_ACCOUNT_SERVICE)
    private userAccountService: IAccountService,
  ) {}
  @Get()
  getAccountPositions(@Query() query: any): Promise<UserPositionEntity> {
    return this.userAccountService.getAccountPositions(query.id);
  }
}
