import { IWalletService } from '@application/in';
import { JwtAuthGuard } from '@application/jwt/jwt-auth.guard';
import {
  Controller,
  Inject,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
} from '@nestjs/common';
import { DepositDTO, OrderPositionDTO, WalletDTO } from 'domain/dto';
import { StocksDTO } from 'domain/dto/stocks.dto';
import { Providers } from 'domain/enums';

@Controller('')
export class WalletController {
  constructor(
    @Inject(Providers.I_WALLET_SERVICE)
    private accountService: IWalletService,
  ) {}
  @Get('userPosition')
  @UseGuards(JwtAuthGuard)
  getWallet(@Req() req: any): Promise<WalletDTO> {
    return this.accountService.getWallet(req.user.id);
  }
  @Get('trends')
  @UseGuards(JwtAuthGuard)
  getTopFiveStocks(): Promise<StocksDTO[]> {
    return this.accountService.getTopFiveStocks();
  }

  @Post('order')
  @UseGuards(JwtAuthGuard)
  orderStocks(
    @Body() orderStock: OrderPositionDTO,
    @Req() req: any,
  ): Promise<WalletDTO> {
    return this.accountService.orderStocks(orderStock, req.user.id);
  }

  @Post('sbp/events')
  @UseGuards(JwtAuthGuard)
  deposit(@Body() deposit: DepositDTO, @Req() req: any): Promise<WalletDTO> {
    return this.accountService.deposit(deposit, req.user.id);
  }
}
