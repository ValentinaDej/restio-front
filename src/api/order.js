import { instance } from 'api';

export const createOrder = async (data, restId) => {
  const result = await instance.post(`/orders/${restId}`, data);
  return result;
};
