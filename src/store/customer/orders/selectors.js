import { createSelector } from '@reduxjs/toolkit';

export const getOrders = (state) => state?.customerOrders.orders;
export const getAmount = (state) => state?.customerOrders.amount;
export const getPaymentInfo = (state) => state?.customerOrders.paymentInfo;
export const getSelectedOrders = (state) => state?.customerOrders.selectedOrders;

export const getTotalPrice = createSelector([getOrders], (orders) => {
  let totalPrice = 0;

  orders.forEach((order) => {
    order.orderItems.forEach((item) => {
      totalPrice += item.dish.price * item.quantity;
    });
  });

  return totalPrice.toFixed(2);
});
export const getOrdersIDs = createSelector([getOrders], (orders) => {
  if (!orders) {
    return [];
  }
  return orders.map((order) => order._id);
});
