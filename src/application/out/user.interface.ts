import { CreateUserDTO, GetUserDTO } from 'domain/dto';
import { UserEntity } from 'domain/entities';

export interface IUserRepository {
  getUser(payload: GetUserDTO): Promise<UserEntity>;
  createUser(payload: CreateUserDTO): Promise<void>;
}
