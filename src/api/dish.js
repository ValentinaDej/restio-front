import instance from 'api';

export const getDishes = async (restId, category) => {
  const data = await instance(`/dishes/restaurant/${restId}?type=${category}`);
  return data;
};

export const fetchDishesList = async (restId) => {
  const response = await instance(`/dishes/restaurant/${restId}`);
  return response.data;
};

export const deleteDishById = async (dishId, restId) => {
  await instance.delete(`/dishes/${dishId}/restaurant/${restId}`);
};
