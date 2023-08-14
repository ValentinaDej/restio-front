import { instance } from 'api';
import { useQuery } from 'react-query';

export const useGetTransactions = (
  restId,
  { pageIndex, pageSize, today, userType, transactionType, date }
) => {
  const queryResp = useQuery(
    ['transactions'],
    async () =>
      await instance.get(
        `/transactions/${restId}?pageIndex=${pageIndex}&pageSize=${pageSize}&today=${today}&userType=${userType}&transactionType=${transactionType}&date=${date}`
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
