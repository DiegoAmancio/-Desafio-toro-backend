import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserPositionDocument, UserPositionModel } from './userPosition.schema';
import { IAccountRepository } from '@application/out';

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectModel(UserPositionModel.name)
    private userPosition: Model<UserPositionDocument>,
  ) {}
  async getAccountPositions(googleId: string): Promise<UserPositionDocument> {
    return this.userPosition.findOne({ googleId });
  }
}
