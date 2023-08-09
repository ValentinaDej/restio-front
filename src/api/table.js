import instance from 'api';

export const callWaiter = async (tableId, data) => {
  const response = await instance.patch(`/tables/${tableId}`, data);
  return response;
};
