import { IAccountService } from '@application/in';
import { JwtAuthGuard } from '@application/jwt/jwt-auth.guard';
import { Req } from '@nestjs/common';
import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { UserPositionEntity } from 'domain/entities';
import { Providers } from 'domain/enums';

@Controller('userPosition')
export class AccountController {
  constructor(
    @Inject(Providers.I_ACCOUNT_SERVICE)
    private userAccountService: IAccountService,
  ) {}
  @Get('')
  @UseGuards(JwtAuthGuard)
  getAccountPositions(@Req() req: any): Promise<UserPositionEntity> {
    return this.userAccountService.getAccountPositions(req.user.id);
  }
}
