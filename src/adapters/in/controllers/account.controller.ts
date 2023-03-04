import { OrderPositionDTO } from '@adapterIn/dto';
import { IAccountService } from '@application/in';
import { JwtAuthGuard } from '@application/jwt/jwt-auth.guard';
import { Body, Post, Req } from '@nestjs/common';
import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { StocksEntity, UserPositionEntity } from 'domain/entities';
import { Providers } from 'domain/enums';

@Controller('')
export class AccountController {
  constructor(
    @Inject(Providers.I_ACCOUNT_SERVICE)
    private accountService: IAccountService,
  ) {}
  @Get('userPosition')
  @UseGuards(JwtAuthGuard)
  getAccountPositions(@Req() req: any): Promise<UserPositionEntity> {
    return this.accountService.getAccountPositions(req.user.id);
  }
  @Get('trends')
  @UseGuards(JwtAuthGuard)
  getTopFiveStocks(): Promise<StocksEntity[]> {
    return this.accountService.getTopFiveStocks();
  }

  @Post('order')
  @UseGuards(JwtAuthGuard)
  orderStocks(
    @Body() orderStock: OrderPositionDTO,
    @Req() req: any,
  ): Promise<UserPositionEntity> {
    return this.accountService.orderStocks(orderStock, req.user.id);
  }
}
