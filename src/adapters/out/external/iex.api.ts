import { IIexApi } from '@application/out/iex.interface';
import { Injectable, Logger } from '@nestjs/common';

import axios from 'axios';

@Injectable()
export class IexService implements IIexApi {
  private readonly logger = new Logger(IexService.name);
  private readonly baseUrl = 'https://api.iex.cloud/v1/data/core/quote/';

  async getBDR(symbol: string) {
    this.logger.log('getBDR ' + symbol);

    const { data } = await axios.get(
      this.baseUrl + symbol + '?token=pk_7faf4690545d469aa5872f7d84d9f10c',
    );

    return data && data.length > 0 ? data[0] : null;
  }
  async getMultipleBDRs(symbols: string[]) {
    this.logger.log('getMultipleBDRs ');

    return Promise.all(symbols.map(symbol => this.getBDR(symbol)));
  }
}
