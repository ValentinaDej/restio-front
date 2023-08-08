export const formatNumberWithTwoDecimals = (value) => {
  const formattedValue = parseFloat(value).toFixed(2);
  return parseFloat(formattedValue);
};
