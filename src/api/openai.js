import toast from 'react-hot-toast';
import instance from './index';

export const openai = async (restaurantId, isVegan, likeSpicy, isPasc, wantHealthy, budget) => {
  try {
    return await instance.post(`/openai/${restaurantId}`, {
      isVegan,
      likeSpicy,
      isPasc,
      wantHealthy,
      budget,
    });
  } catch (error) {
    toast.error('An error occurred. Please try again later.');
  }
};
