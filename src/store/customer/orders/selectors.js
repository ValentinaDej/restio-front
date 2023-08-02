import { createSelector } from '@reduxjs/toolkit';

export const getOrders = (state) => state.customerOrders.orders;
export const getAmount = (state) => state.customerOrders.amount;
export const getPaymentInfo = (state) => state.customerOrders.paymentInfo;
export const getIsLoading = (state) => state.customerOrders.isLoading;
export const getSelectedOrders = (state) => state.customerOrders.selectedOrders;

export const getTotalPrice = createSelector([getOrders], (orders) => {
  const totalPrice = orders.reduce((acc, order) => {
    if (order.status !== 'Paid') {
      return acc + order.orderItems.reduce((acc, item) => acc + item.dish.price * item.quantity, 0);
    } else {
      return acc;
    }
  }, 0);

  return Math.round(totalPrice * 100) / 100;
});

export const getOrdersIDs = createSelector([getOrders], (orders) => {
  if (!orders) {
    return [];
  }

  return orders.map((order) => order._id);
});
