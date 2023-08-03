const { instance } = require('api');
const { useQuery } = require('react-query');

export const useGetOrdersByTableId = () => {
  const queryResp = useQuery(
    ['orders'],
    async () =>
      // need to replace by real tableId, and resId
      await instance.get(`orders/64c4fdea4055a7111092df32/table/64c4fe004055a7111092df34`),
    {
      refetchInterval: 30000,
    }
  );
  return queryResp;
};
