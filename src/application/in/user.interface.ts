import { UserEntity } from '@adapterOut/user';
import { CreateUserDTO, GetUserDTO } from 'domain/dto';

export interface IUserService {
  createUser(payload: CreateUserDTO): Promise<void>;
  getUser(payload: GetUserDTO): Promise<UserEntity>;
}
