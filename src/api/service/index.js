import { instance } from 'api';
import { useQuery, useMutation } from 'react-query';

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
    ['ordersByRestaurantId'],
    async () => await instance.get(`orders/${restId}`)
    // {
    //   refetchInterval: 30000,
    // }
  );
  return queryResp;
};

export const useGetTablesByRestaurantId = (restId) => {
  const queryResp = useQuery(
    ['tablesByRestaurantId'],
    async () => await instance.get(`tables/restaurant/${restId}`)
    // {
    //   refetchInterval: 30000,
    // }
  );
  return queryResp;
};

export const useChangeTableStatus = () => {
  const mutationResp = useMutation(
    async ({ status, restaurant_id, table_id: id }) =>
      await instance.patch(`tables/${id}`, { status, restaurant_id })
  );
  return mutationResp;
};
