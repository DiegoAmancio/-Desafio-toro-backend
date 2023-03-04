import {
  table,
  hashKey,
  rangeKey,
  attribute,
} from '@aws/dynamodb-data-mapper-annotations';
import { Position } from './position';

@table('desafio-toro')
export class WalletEntity {
  static readonly PK_PREFIX = 'WALLET';

  @hashKey({ keyType: 'HASH' })
  PK: string;
  @rangeKey({ keyType: 'RANGE' })
  SK: string;

  @attribute()
  CheckingAccountAmount: number;

  @attribute()
  Positions: Position[];

  fill(id: string) {
    this.PK = WalletEntity.PK_PREFIX;
    this.SK = id;
    this.CheckingAccountAmount = 0;
    this.Positions = [];
  }

  get checkingAccountAmount() {
    return this.CheckingAccountAmount;
  }
  get positions() {
    return this.Positions;
  }
}
