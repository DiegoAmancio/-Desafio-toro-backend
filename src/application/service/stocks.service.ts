import { getValues } from '@application/helper';
import { IStocksService } from '@application/in';

import { Injectable, Logger } from '@nestjs/common';
import { StocksEntity } from 'domain/entities';

@Injectable()
export class StocksService implements IStocksService {
  private readonly logger = new Logger(StocksService.name);

  async getTopFiveStocks(): Promise<StocksEntity[]> {
    this.logger.log('getTopFiveStocks');

    const topFiveStocks = ['JPM', 'GOOGL', 'BRK.B', 'JNJ', 'AAPL'];
    return getValues(topFiveStocks);
  }
}
