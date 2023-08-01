export const selectOrders = (state, { payload }) => {
  const index = state.selectedOrders.indexOf(payload._id);
  const countPrice = Math.round(payload.totalPrice * 100) / 100;
  if (index !== -1) {
    state.selectedOrders.splice(index, 1);
    state.amount -= countPrice;
  } else {
    state.selectedOrders.push(payload._id);
    state.amount += countPrice;
  }
};
