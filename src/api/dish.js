import instance from 'api';

export const getDishes = async (restId, category, type) => {
  const data = await instance(`/dishes/restaurant/${restId}?type=${category}&isActive=${type}`);
  return data;
};

export const getDishById = async (dishId) => {
  const response = await instance(`/dishes/${dishId}`);
  return response.data;
};

export const deleteDishById = async (dishId, restId) => {
  await instance.patch(`/dishes/${dishId}/restaurant/${restId}`, { isActive: false });
};
