import { instance } from 'api';

export const createOrder = async (data, restId) => {
  const result = await instance.post(`/orders/${restId}`, data);
  return result;
};

export const getAllOrders = async (restId) => {
  const request = await instance(`/orders/${restId}`);
  return request.data.data.orders;
};
