import { IUserRepository } from '@application/out';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel, UserDocument } from './user.schema';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(UserModel.name)
    private user: Model<UserDocument>,
  ) {}
  async getUser(id: string): Promise<UserDocument> {
    return this.user.findOne({ googleId: id });
  }

  async createUser(
    googleId: string,
    name: string,
    email: string,
  ): Promise<UserDocument> {
    const user = new this.user({
      googleId,
      name,
      email,
    });
    return user.save();
  }
}
