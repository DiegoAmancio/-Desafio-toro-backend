import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Position } from './positions';

export type UserPositionDocument = HydratedDocument<UserPositionModel>;

@Schema()
export class UserPositionModel {
  @Prop()
  checkingAccountAmount: number;
  @Prop([Position])
  positions: Position[];
}

export const UserPositionSchema =
  SchemaFactory.createForClass(UserPositionModel);
