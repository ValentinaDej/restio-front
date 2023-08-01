export const selectOrders = (state, { payload }) => {
  const index = state.selectedOrders.indexOf(payload._id);
  if (index !== -1) {
    state.selectedOrders.splice(index, 1);
    state.amount -= Math.round(payload.totalPrice * 100) / 100;
  } else {
    state.selectedOrders.push(payload._id);
    state.amount += Math.round(payload.totalPrice * 100) / 100;
  }
};
