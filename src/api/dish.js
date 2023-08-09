import { instance } from 'api';

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

export const createDish = async (body, restId) => {
  try {
    await instance.post(`/restaurant/${restId}`, body);
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === 400) {
        throw new Error('Bad request. Please provide valid credentials.');
      } else if (status === 401) {
        throw new Error('Unauthorized. Please check your email and password.');
      } else if (status === 403) {
        throw new Error('Forbidden. You do not have permission to access this resource.');
      } else if (status === 404) {
        throw new Error('Resource not found. Please try again later.');
      } else if (status === 500) {
        throw new Error('Internal server error. Please try again later.');
      }
    }

    throw new Error('An error occurred. Please try again later.');
  }
};
