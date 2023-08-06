const { instance } = require('api');
const { useQuery, useMutation, useQueryClient } = require('react-query');

export const useGetOrdersByTableId = ({ restId, tableId }) => {
  const queryResp = useQuery(
    ['orders'],
    async () => await instance.get(`orders/${restId}/table/${tableId}`),
    {
      // refetchInterval: 30000,
    }
  );
  return queryResp;
};

export const useUpdateOrderStatusByWaiter = ({ restId, tableId }, orders) => {
  const queryClient = useQueryClient();

  const updateOrderStatus = async () => {
    const response = await instance.patch(`orders/${restId}/table/${tableId}`, { orders });
    return response.data;
  };

  const mutation = useMutation(updateOrderStatus, {
    onSuccess: () => {
      queryClient.refetchQueries(['orders']);
    },
  });

  return mutation;
};

export const useUpdateTableStatusByWaiter = ({ restId, tableId }, status) => {
  const queryClient = useQueryClient();

  const updateTableStatus = async () => {
    const response = await instance.patch(`/tables/${tableId}`, { restaurant_id: restId, status });
    return response.data;
  };
  const mutation = useMutation(updateTableStatus, {
    onSuccess: () => {
      queryClient.setQueryData(['orders'], []);
    },
  });

  return mutation;
};
