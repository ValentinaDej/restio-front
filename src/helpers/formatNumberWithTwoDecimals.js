export const formatNumberWithTwoDecimals = (value) => {
  const formattedValue = parseFloat(value).toFixed(2);
  const parts = formattedValue.split('.');

  if (parts.length === 1) {
    // Якщо немає десяткової частини, додати два нулі
    return `${formattedValue}.00`;
  } else if (parts[1].length === 1) {
    // Якщо є лише одна цифра після коми, додати один нуль
    return `${formattedValue}0`;
  } else {
    return formattedValue;
  }
};
