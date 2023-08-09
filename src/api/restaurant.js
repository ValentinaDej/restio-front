import { instance } from 'api';
import { useQuery } from 'react-query';

export const getRestaurant = async (restId) => {
  const { data } = await instance.get(`/restaurants/${restId}`);
  return data;
};

export const useGetStatistics = (restId) => {
  const queryResp = useQuery(
    ['statistics'],
    async () => await instance.get(`/restaurants/${restId}/statistics`),
    {
      refetchInterval: 30000,
    }
  );
  return queryResp;
};
