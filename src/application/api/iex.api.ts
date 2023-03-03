import axios from 'axios';

const baseUrl = 'https://api.iex.cloud/v1/data/core/quote/';

export const getBDR = (symbol: string) =>
  axios
    .get(baseUrl + symbol + '?token=pk_7faf4690545d469aa5872f7d84d9f10c')
    .then(({ data }) => (data && data.length > 0 ? data[0] : data));
