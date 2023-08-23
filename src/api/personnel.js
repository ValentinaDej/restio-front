import instance from 'api';
import toast from 'react-hot-toast';
export const getPersonnel = async ({ restId, pageParam = 1, searchText = '' }) => {
  try {
    const response = await instance(
      `/personnel/restaurant/${restId}?page=${pageParam}&limit=9&searchText=${searchText}`
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error;
  }
};

export const getPersonnelById = async (personId, restId) => {
  try {
    const response = await instance(`/personnel/${personId}/restaurant/${restId}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error;
  }
};

export const createPersonnel = async (formData, rest_id) => {
  try {
    const response = await instance.post(`/personnel`, {
      ...formData,
      restaurant_id: rest_id,
    });
    toast.success('Personnel added successfully');
    return response;
  } catch (error) {
    toast.error(error.response.data.message);
    return error;
  }
};

export const updatePersonnel = async (personId, formData, rest_id) => {
  try {
    const response = await instance.patch(`/personnel/${personId}`, {
      ...formData,
      restaurant_id: rest_id,
    });
    toast.success('Personnel updated successfully');
    return response;
  } catch (error) {
    toast.error(error.response.data.message);
    return error;
  }
};
