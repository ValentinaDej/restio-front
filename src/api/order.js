import { instance } from 'api';

export const createOrder = async (data, restId) => {
  const result = await instance.post(`/orders/${restId}`, data);
  return result;
};

export const getAllOrders = async (restId) => {
  const request = await instance(`/orders/${restId}`);
  const allOrders = request.data.data.orders;
  const normalizedData = allOrders.reduce((acc, item) => {
    const allDishes = item.orderItems.map((el) => ({ ...el, orderId: item._id }));
    acc = [...acc, ...allDishes];
    return acc;
  }, []);
  return normalizedData;
};
