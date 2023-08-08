export const formatDateTime = (value) => {
  const year = value.getFullYear();
  const day = value.getDate().toString().padStart(2, '0');
  const month = (value.getMonth() + 1).toString().padStart(2, '0');
  const hours = value.getHours().toString().padStart(2, '0');
  const minutes = value.getMinutes().toString().padStart(2, '0');

  const formattedValue = `${day}/${month}/${year} ${hours}:${minutes}`;
  return formattedValue;
};
