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

export const useUpdateOrderStatusByWaiterOrCook = ({ restId, tableId }, orders) => {
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
