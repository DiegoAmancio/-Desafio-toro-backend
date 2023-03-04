export interface IAuthService {
  login(token: string): Promise<any>;
  getUserByToken(token: string);
}
