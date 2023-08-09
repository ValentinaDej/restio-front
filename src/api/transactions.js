import { instance } from 'api';
import { useQuery } from 'react-query';

export const useGetTransactions = (restId, userId) => {
  const queryResp = useQuery(
    ['transactions'],
    async () => await instance.get(`/transactions/${restId}`),
    {
      refetchInterval: 30000,
    }
  );
  return queryResp;
};
