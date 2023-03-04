import { IStocksService } from '@application/in';
import { JwtAuthGuard } from '@application/jwt/jwt-auth.guard';
import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { StocksEntity } from 'domain/entities';
import { Providers } from 'domain/enums';

@Controller('trends')
export class StocksController {
  constructor(
    @Inject(Providers.I_STOCKS_SERVICE)
    private stocksService: IStocksService,
  ) {}
  @Get('')
  @UseGuards(JwtAuthGuard)
  getTopFiveStocks(): Promise<StocksEntity[]> {
    return this.stocksService.getTopFiveStocks();
  }
}
