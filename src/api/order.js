import instance from 'api';
const { useQuery, useMutation, useQueryClient } = require('react-query');

export const createOrder = async (data, restId) => {
  const result = await instance.post(`/orders/${restId}`, data);
  return result;
};

export const getAllOrders = async (restId) => {
  const request = await instance(`/orders/${restId}`);
  const allOrders = request.data.data.orders;
  console.log(allOrders);

  const groupedByTableId = {};

  for (const obj of allOrders) {
    if (!groupedByTableId[obj.table_id]) {
      groupedByTableId[obj.table_id] = {
        table_id: obj.table_id,
        orderItems: addOrderIdToOrderItems([...obj.orderItems], obj._id, obj.created_at),
      };
    } else {
      groupedByTableId[obj.table_id].orderItems.push(
        ...addOrderIdToOrderItems(obj.orderItems, obj._id)
      );
    }
  }

  function addOrderIdToOrderItems(orderItems, orderId, create) {
    return orderItems.map((item) => ({ ...item, orderId, create }));
  }
  const normalizedData = Object.values(groupedByTableId);

  console.log(normalizedData);
  return normalizedData;
};

export const useGetOrdersByTableId = ({ restId, tableId }) => {
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

export const useUpdateDishStatusByWaiter = () => {
  const queryClient = useQueryClient();

  const updateDishStatus = async ({ urlParams: { restId }, status, dishId, orderId }) => {
    const response = await instance.patch(`orders/${restId}/${orderId}/${dishId}`, { status });
    return response.data;
  };

  const mutation = useMutation(updateDishStatus, {
    onSuccess: () => {
      queryClient.refetchQueries(['orders']);
    },
  });

  return mutation;
};

//   const normalizedData = allOrders.reduce((acc, item) => {
//     const allDishes = item.orderItems.map((el) => ({
//       ...el,
//       orderId: item._id,
//       tableId: item.table_id,
//       create: item.created_at,
//     }));

//     acc = [...acc, ...allDishes];
//     return acc;
//   }, []);
