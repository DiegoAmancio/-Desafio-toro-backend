export interface IIexApi {
  getBDR(symbol: string): Promise<any>;
  getMultipleBDRs(symbols: string[]): Promise<any[]>;
}
