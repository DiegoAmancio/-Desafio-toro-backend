import { CreateUserDTO, GetUserDTO } from 'domain/dto';
import { UserEntity } from 'domain/entities';

export interface IUserService {
  createUser(payload: CreateUserDTO): Promise<void>;
  getUser(payload: GetUserDTO): Promise<UserEntity>;
}
