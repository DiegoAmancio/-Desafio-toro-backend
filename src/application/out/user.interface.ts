import { UserEntity } from '@adapterOut/user';
import { CreateUserDTO, GetUserDTO } from 'domain/dto';

export interface IUserRepository {
  getUser(payload: GetUserDTO): Promise<UserEntity>;
  createUser(payload: CreateUserDTO): Promise<void>;
}
