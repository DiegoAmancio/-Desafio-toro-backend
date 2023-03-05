export type DepositDTO = {
  event: string;
  target: {
    bank: string;
    branch: string;
    account: string;
  };
  origin: {
    bank: string;
    branch: string;
    cpf: string;
  };
  amount: number;
};
