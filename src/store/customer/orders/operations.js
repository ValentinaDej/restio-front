export const selectPayOrder = (state, { payload }) => {
  const index = state.selectedOrders.payOrders.indexOf(payload._id);
  if (index !== -1) {
    state.selectedOrders.payOrders.splice(index, 1);
    state.dataParams.amount -= payload.totalPrice;
  } else {
    state.selectedOrders.payOrders.push(payload._id);
    state.dataParams.amount += payload.totalPrice;
  }
};
