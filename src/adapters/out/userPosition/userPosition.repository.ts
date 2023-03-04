import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserPositionDocument, UserPositionModel } from './userPosition.schema';
import { IAccountRepository } from '@application/out';

@Injectable()
export class AccountRepository implements IAccountRepository {
  private readonly logger = new Logger(AccountRepository.name);

  constructor(
    @InjectModel(UserPositionModel.name)
    private userPosition: Model<UserPositionDocument>,
  ) {}
  async updateAccountPositions(
    id: string,
    data: UserPositionModel,
  ): Promise<void> {
    this.logger.log('updateAccountPositions ' + id);
    await this.userPosition.findByIdAndUpdate(id, data);
  }

  createAccountPositions(id: string): Promise<UserPositionDocument> {
    this.logger.log('createAccountPositions ' + id);

    const account = new this.userPosition(new UserPositionModel(id));
    return account.save();
  }
  async getAccountPositions(userId: string): Promise<UserPositionDocument> {
    this.logger.log('getAccountPositions ' + userId);

    return this.userPosition.findOne({ user: userId });
  }
}
