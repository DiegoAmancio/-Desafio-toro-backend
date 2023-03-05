import { UserEntity } from '@adapterOut/user';

export const userId = '123131312312313';
export const email = 'top@gmail.com';
export const name = 'top';

export const createUser = () => {
  const user = new UserEntity();

  user.fill(userId, email, name);

  return user;
};
