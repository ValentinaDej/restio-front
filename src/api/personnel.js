import instance from 'api';
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

export const getPersonnel = async ({ restId, pageParam = 1, searchText = '' }) => {
  try {
    const response = await instance(
      `/personnel/restaurant/${restId}?page=${pageParam}&limit=4&searchText=${searchText}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    sendCorrectErrMsg(error);
  }
};

export const getPersonnelById = async (personId, restId) => {
  try {
    const response = await instance(`/personnel/${personId}/restaurant/${restId}`);
    return response.data;
  } catch (error) {
    sendCorrectErrMsg(error);
  }
};

export const createPersonnel = async (formData, rest_id) => {
  try {
    const response = await instance.post(`/personnel`, {
      ...formData,
      restaurant_id: rest_id,
    });
    return response.data;
  } catch (error) {
    sendCorrectErrMsg(error);
  }
};

export const updatePersonnel = async (personId, formData, rest_id) => {
  try {
    const response = await instance.patch(`/personnel/${personId}`, {
      ...formData,
      restaurant_id: rest_id,
    });
    return response.data;
  } catch (error) {
    sendCorrectErrMsg(error);
  }
};
