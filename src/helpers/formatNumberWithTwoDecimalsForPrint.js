export const formatNumberWithTwoDecimalsForPrint = (value) => {
  const formattedValue = parseFloat(value).toFixed(2);
  const parts = formattedValue.split('.');

  if (parts.length === 1) {
    return `${formattedValue}.00`;
  } else if (parts[1].length === 1) {
    return `${formattedValue}0`;
  } else {
    return formattedValue;
  }
};
