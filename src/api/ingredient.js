import instance from 'api';

export const getIngredients = async () => {
  const { data } = await instance(`/ingredients`);
  return data;
};
