export interface IAuthService {
  isRegistered(token: string): Promise<boolean>;
  login(token: string, cpf?: string): Promise<any>;
  getUserByToken(token: string);
}
