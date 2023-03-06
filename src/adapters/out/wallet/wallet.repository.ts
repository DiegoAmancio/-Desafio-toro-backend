import { IWalletRepository } from '@application/out';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { GetItemDTO } from 'domain/dto';
import { WalletEntity } from './wallet.entity';

@Injectable()
export class WalletRepository implements IWalletRepository {
  private mapper: DataMapper;
  private client: DynamoDB;

  constructor() {
    this.client = new DynamoDB({ region: 'us-east-1' });
    this.mapper = new DataMapper({ client: this.client });
  }
  getWallet(payload: GetItemDTO): Promise<WalletEntity> {
    const item = new WalletEntity();
    if (payload.PK && payload.SK) {
      item.PK = payload.PK;
      item.SK = payload.SK;
      return this.mapper.get<WalletEntity>(item);
    }
  }
  createWallet(id: string): Promise<WalletEntity> {
    const item = new WalletEntity();
    item.fill(id);

    return this.mapper.put<WalletEntity>(item);
  }

  async updateWallet(data: WalletEntity): Promise<void> {
    await this.mapper.update(data);
  }
}
