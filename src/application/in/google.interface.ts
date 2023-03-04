export interface IGoogleService {
  getUserByToken(token: string): Promise<any>;
}
