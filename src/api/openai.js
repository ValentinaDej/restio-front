import toast from 'react-hot-toast';
import instance from './index';

export const openai = async (
  restaurantId,
  isVegan,
  likeSpicy,
  isPasc,
  wantHealthy,
  wantDrink,
  budget
) => {
  try {
    const response = await instance.post(`/openai/${restaurantId}`, {
      isVegan,
      likeSpicy,
      isPasc,
      wantHealthy,
      wantDrink,
      budget,
    });
    console.log(response.data.response);
    return response;
  } catch (error) {
    toast.error('An error occurred. Please try again later.');
    console.log(error);
  }
};
