export const selectOrders = (state, { payload }) => {
  const index = state.selectedOrders.indexOf(payload._id);
  if (index !== -1) {
    state.selectedOrders.splice(index, 1);
    state.amount -= payload.totalPrice;
  } else {
    state.selectedOrders.push(payload._id);
    state.amount += payload.totalPrice;
  }
};
