import { BASE_URL, instance } from './index';
import toast from 'react-hot-toast';

export const PERSONNEL = `/personnel`;

const sendCorrectErrMsg = (error) => {
  if (error.response) {
    const { status } = error.response;
    if (status === 400) {
      toast.error('Bad request. Please provide valid credentials.');
    } else if (status === 401) {
      toast.error('Unauthorized. Please check your email and password.');
    } else if (status === 403) {
      toast.error('Forbidden. You do not have permission to access this resource.');
    } else if (status === 404) {
      toast.error('Resource not found. Please try again later.');
    } else if (status === 500) {
      toast.error('Internal server error. Please try again later.');
    }
  }

  toast.error('An error occurred. Please try again later.');
};

export const getPersonnel = async (restId) => {
  try {
    const response = await instance.get(`${BASE_URL}/personnel/restaurant/${restId}`);
    return response.data;
  } catch (error) {
    sendCorrectErrMsg(error);
  }
};

export const getPersonnelById = async (personId) => {
  try {
    const response = await instance.get(`${BASE_URL}/personnel/${personId}`);
    return response.data;
  } catch (error) {
    sendCorrectErrMsg(error);
  }
};

export const createPersonnel = async (formData, rest_id) => {
  try {
    const response = await instance.post(`${BASE_URL}/personnel`, {
      ...formData,
      rest_id: rest_id,
    });
    return response.data;
  } catch (error) {
    sendCorrectErrMsg(error);
  }
};

export const updatePersonnel = async (personId, formData, rest_id) => {
  try {
    const response = await instance.patch(`${BASE_URL}/personnel/${personId}`, {
      ...formData,
      restaurant_id: rest_id,
    });
    return response.data;
  } catch (error) {
    sendCorrectErrMsg(error);
  }
};
