import { instance } from 'api';

export const getDishes = async (restId, category) => {
  const data = await instance(`/dishes/restaurant/${restId}?type=${category}`);
  return data;
};

export const deleteDishById = async (dishId, restId) => {
  await instance.patch(`/dishes/${dishId}/restaurant/${restId}`);
};
