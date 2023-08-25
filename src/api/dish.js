import instance from 'api';
import { toast } from 'react-hot-toast';

const handleErrorResponse = (error) => {
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
};

export const getDishes = async (restId, category, type, pageParam, searchText) => {
  try {
    let typeNormalized =
      type === 'active' ? `&isActive=true` : type === 'all' ? '' : `&isActive=false`;
    let data = [];
    if (category) {
      data = await instance(
        `/dishes/restaurant/${restId}?type=${category}${typeNormalized}&page=${pageParam}&limit=11&searchText=${searchText}`
      );
    } else {
      data = await instance(
        `/dishes/restaurant/${restId}?page=${pageParam}${typeNormalized}&limit=11&searchText=${searchText}`
      );
    }

    return data.data;
  } catch (error) {
    handleErrorResponse(error);
  }
};
export const getAllDishes = async (restId, type, pageParam) => {
  const data = await instance(
    `/dishes/restaurant/${restId}?isActive=${type}&page=${pageParam}&limit=6`
  );
  return data;
};
export const getDishesForMenu = async (restId, category, type, pageParam) => {
  const data = await instance(
    `/dishes/restaurant/${restId}?type=${category}&isActive=${type}&page=${pageParam}&limit=6`
  );

  return data;
};

export const getDishById = async (dishId) => {
  try {
    const response = await instance(`/dishes/${dishId}`);
    return response.data;
  } catch (error) {
    handleErrorResponse(error);
  }
};

export const updateDishById = async (body, dishesId, restId) => {
  try {
    const response = await instance.patch(`dishes/${dishesId}/edit/restaurant/${restId}`, body);
    return response;
  } catch (error) {
    handleErrorResponse(error);
  }
};

export const createDish = async (body, restId) => {
  try {
    const response = await instance.post(`/dishes/restaurant/${restId}`, body);
    return response;
  } catch (error) {
    handleErrorResponse(error);
  }
};

export const deleteDishById = async (dishId, restId) => {
  try {
    await instance.patch(`/dishes/${dishId}/restaurant/${restId}`);
  } catch (error) {
    handleErrorResponse(error);
    toast.error(error.message);
  }
};
