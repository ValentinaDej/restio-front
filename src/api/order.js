import { instance } from 'api';
import { errorMessage } from 'helpers/errorMessage';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const { useQuery, useMutation, useQueryClient } = require('react-query');

export const createOrder = async (data, restId) => {
  const result = await instance.post(`/orders/${restId}`, data);
  return result;
};

export const getAllOrders = async (restId) => {
  const request = await instance(`/orders/${restId}`);
  const allOrders = request.data.orders;
  const normalizedData = allOrders.reduce((acc, item) => {
    const allDishes = item.orderItems.map((el) => ({
      ...el,
      orderId: item._id,
      orderNumber: item.number,
      tableNumber: item.table_id.table_number,
      create: item.created_at,
    }));

    acc = [...acc, ...allDishes];
    return acc;
  }, []);
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
      cacheTime: 0,
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
      onError: (error) => {
        console.error(`Error fetching`, error);
        toast.error(`Error fetching`);
      },
    }
  );

  return queryResp;
};

export const useUpdateOrderStatusByWaiter = ({ restId, tableId }, amount, paymentType) => {
  const queryClient = useQueryClient();

  const createTransactionOffline = async (orders) => {
    const response = await instance.post(`transactions/manual/${restId}`, {
      info: orders,
      amount,
      type: paymentType,
    });
    return response.data;
  };

  const updateOrderStatus = async (selectedOrders) => {
    try {
      await createTransactionOffline(selectedOrders);
      const response = await instance.patch(`orders/${restId}/table/${tableId}`, {
        orders: selectedOrders,
      });
      return response.data;
    } catch (err) {
      errorMessage(err.response.data.message);
    }
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
  const navigate = useNavigate();
  const updateTableStatus = async () => {
    const response = await instance.patch(`/tables/${tableId}`, { restaurant_id: restId, status });
    return response.data;
  };
  const mutation = useMutation(updateTableStatus, {
    onSuccess: () => {
      queryClient.setQueryData(['orders'], []);
      toast.success(`Table is free`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      navigate(`/${restId}/waiter/tables`);
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

export const useUpdateReadyDishesStatusesByWaiter = () => {
  const queryClient = useQueryClient();

  const updateDishStatus = async ({ urlParams: { restId }, orderId }) => {
    const response = await instance.patch(`orders/${restId}/dishes/${orderId}`);
    return response.data;
  };

  const mutation = useMutation(updateDishStatus, {
    onSuccess: () => {
      queryClient.refetchQueries(['orders']);
    },
  });

  return mutation;
};
