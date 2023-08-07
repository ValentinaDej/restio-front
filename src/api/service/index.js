const { instance } = require('api');
const { useQuery } = require('react-query');

export const useGetOrdersByTableId = (restId, tableId) => {
  const queryResp = useQuery(
    ['orders'],
    async () => await instance.get(`orders/${restId}/table/${tableId}`),
    {
      refetchInterval: 30000,
    }
  );
  return queryResp;
};

export const useGetOrdersByRestaurantId = (restId) => {
  const queryResp = useQuery(
    'orders',
    async () => await instance.get(`orders/${restId}`)
    // {
    //   refetchInterval: 30000,
    // }
  );
  return queryResp;
};

export const useGetTablesByRestaurantId = (restId) => {
  const queryResp = useQuery(
    'tables',
    async () => await instance.get(`tables/restaurant/${restId}`)
    // {
    //   refetchInterval: 30000,
    // }
  );
  return queryResp;
};
