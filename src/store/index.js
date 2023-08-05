import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './auth/authSlice';
import { customerOrdersReducer } from './customer/orders/ordersSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    customerOrders: customerOrdersReducer,
  },
});

export default store;
