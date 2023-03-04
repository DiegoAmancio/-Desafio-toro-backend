import { DynamoDB } from 'aws-sdk';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { IUserRepository } from '@application/out';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'domain/entities/user.entity';
import { CreateUserDTO, GetUserDTO } from 'domain/dto';

@Injectable()
export class UserRepository implements IUserRepository {
  private mapper: DataMapper;
  private client: DynamoDB;

  constructor() {
    this.client = new DynamoDB({ region: 'us-east-1' });
    this.mapper = new DataMapper({ client: this.client });
  }

  async getUser(payload: GetUserDTO): Promise<UserEntity> {
    try {
      const item = new UserEntity();
      if (payload.PK && payload.SK) {
        item.PK = payload.PK;
        item.SK = payload.SK;
        return this.mapper.get<UserEntity>(item);
      }

      throw 'need PK and SK';
    } catch (error) {}
  }

  async createUser(payload: CreateUserDTO): Promise<void> {
    const item = new UserEntity();
    item.fill(payload.id, payload.email, payload.name);

    await this.mapper.put<UserEntity>(item);
  }
}
