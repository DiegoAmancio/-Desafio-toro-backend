import { UserEntity } from '@adapterOut/user/user.entity';
import { CreateUserDTO, GetItemDTO } from 'domain/dto';

export interface IUserRepository {
  getUser(payload: GetItemDTO): Promise<UserEntity>;
  createUser(payload: CreateUserDTO): Promise<void>;
}
