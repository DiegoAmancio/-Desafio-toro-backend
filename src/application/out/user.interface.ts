import { UserDocument } from '@adapterOut/user';

export interface IUserRepository {
  getUser(id: string): Promise<UserDocument>;
  createUser(id: string, name: string, email: string): Promise<UserDocument>;
}
