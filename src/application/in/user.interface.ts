import { UserEntity } from '@adapterOut/user';
import { CreateUserDTO, GetItemDTO } from 'domain/dto';

export interface IUserService {
  createUser(payload: CreateUserDTO): Promise<void>;
  getUser(payload: GetItemDTO): Promise<UserEntity>;
}
