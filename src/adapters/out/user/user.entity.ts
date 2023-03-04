import {
  table,
  hashKey,
  rangeKey,
  attribute,
} from '@aws/dynamodb-data-mapper-annotations';

@table('desafio-toro')
export class UserEntity {
  static readonly PK_PREFIX = 'USER';

  @hashKey({ keyType: 'HASH' })
  PK: string;
  @rangeKey({ keyType: 'RANGE' })
  SK: string;

  @hashKey({ keyType: 'HASH' })
  Document: string;
  @hashKey({ keyType: 'HASH' })
  Email: string;

  @attribute()
  Name: string;

  fill(id: string, email: string, name: string) {
    this.PK = UserEntity.PK_PREFIX;
    this.SK = id;

    this.Email = email;
    this.Name = name;
  }
}
