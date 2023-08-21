import instance from 'api';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { setTablesData } from 'store/tables/tableSlice';
import toast from 'react-hot-toast';

export const callWaiter = async (tableId, data) => {
  const response = await instance.patch(`/tables/${tableId}`, data);
  return response;
};

export const useGetTablesByRestaurantId = (restId) => {
  const dispatch = useDispatch();

  const queryResp = useQuery(
    ['tablesByRestaurantId'],
    async () => await instance.get(`tables/restaurant/${restId}`),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      onSuccess: (data) => {
        dispatch(setTablesData(data.data));
      },
      onError: (error) => {
        console.error(`Error fetching`, error);
        toast.error(`Error fetching`);
      },
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
