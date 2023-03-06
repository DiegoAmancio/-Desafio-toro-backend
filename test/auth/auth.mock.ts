import { UserEntity } from '@adapterOut/user/user.entity';

export const userId = '123131312312313';
export const email = 'top@gmail.com';
export const name = 'top';
export const cpf = '6541160498';

export const createUser = () => {
  const user = new UserEntity();

  user.fill(userId, email, name, cpf);

  return user;
};
