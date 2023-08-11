import instance from 'api';

export const getIngridients = async () => {
  const { data } = await instance(`/ingredients`);
  return data;
};
