import { instance } from 'api';
import { useQuery } from 'react-query';

export const useGetTransactions = (
  restId,
  { pageIndex, pageSize, today, userType, transactionType, date, nameFilter, transactionSortType }
) => {
  const queryResp = useQuery(
    ['transactions'],
    async () =>
      await instance.get(
        `/transactions/${restId}?pageIndex=${pageIndex}&pageSize=${pageSize}&today=${today}&userType=${userType}&transactionType=${transactionType}&date=${date}&nameFilter=${nameFilter}&transactionSortType=${transactionSortType}`
      ),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      keepPreviousData: true,
    }
  );
  return queryResp;
};

export const useGetTransactionsStatistics = (restId, timestamp) => {
  const queryResp = useQuery(
    ['statistics'],
    async () => await instance.get(`/transactions/statistics/${restId}/?timestamp=${timestamp}`),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
    }
  );
  return queryResp;
};
