import { UserDocument } from '@adapterOut/user';

export interface IUserService {
  createUser(id: string, name: string, email: string): Promise<UserDocument>;
  getUser(id: string): Promise<UserDocument>;
}
