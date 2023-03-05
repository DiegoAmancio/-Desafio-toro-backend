export interface IGoogleApi {
  getUserByToken(token: string): Promise<any>;
}
