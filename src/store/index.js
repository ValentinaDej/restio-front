import { configureStore } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';

import authReducer from './auth/authSlice';
import { customerOrdersReducer } from './customer/orders/ordersSlice';

import cartReducer from './cart/cartSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const cartPersistConfig = {
  key: 'cart',
  storage,
};
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,

    auth: authReducer,

    customerOrders: customerOrdersReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export const persistor = persistStore(store);
