import { instance } from 'api';
import { useQuery } from 'react-query';

export const useGetTransactions = (restId, { pageIndex, pageSize }) => {
  const queryResp = useQuery(
    ['transactions'],
    async () =>
      await instance.get(`/transactions/${restId}?pageIndex=${pageIndex}&pageSize=${pageSize}`),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      keepPreviousData: true,
    }
  );
  return queryResp;
};
