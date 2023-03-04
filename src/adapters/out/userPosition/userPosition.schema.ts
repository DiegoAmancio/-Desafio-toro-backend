import { Prop, Schema as nestSchema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Position } from './positions';

export type UserPositionDocument = HydratedDocument<UserPositionModel>;

@nestSchema()
export class UserPositionModel {
  @Prop()
  checkingAccountAmount: number;
  @Prop([Position])
  positions: Position[];

  @Prop()
  user: string;

  constructor(userId: string) {
    this.checkingAccountAmount = 0;
    this.positions = [];
    this.user = userId;
  }
}

export const UserPositionSchema =
  SchemaFactory.createForClass(UserPositionModel);
