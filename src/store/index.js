import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import { customerOrdersReducer } from './customer/orders/ordersSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    customerOrders: customerOrdersReducer,
  },
});

export default store;
