import { instance } from 'api';

export const getRestaurant = async (restId) => {
  const { data } = await instance.get(`/restaurants/${restId}`);
  return data;
};
