import { instance } from 'api';
import { useQuery, useMutation, useQueryClient } from 'react-query';

export const useGetOrdersByTableId = (restId, tableId) => {
  const queryResp = useQuery(
    ['orders'],
    async () => await instance.get(`orders/${restId}/table/${tableId}`),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
    }
  );
  return queryResp;
};

export const useGetOrdersByRestaurantId = (restId) => {
  const queryResp = useQuery(
    ['ordersByRestaurantId'],
    async () => await instance.get(`orders/${restId}`),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
    }
  );

  return queryResp;
};

export const useGetTablesByRestaurantId = (restId) => {
  const queryResp = useQuery(
    ['tablesByRestaurantId'],
    async () => await instance.get(`tables/restaurant/${restId}`),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
    }
  );
  return queryResp;
};

export const useChangeTableStatus = () => {
  const queryClient = useQueryClient();

  const mutationResp = useMutation(
    async ({ status, restaurant_id, table_id: id }) =>
      await instance.patch(`tables/${id}`, { status, restaurant_id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tablesByRestaurantId');
        queryClient.invalidateQueries('ordersByRestaurantId');
      },
    }
  );
  return mutationResp;
};
