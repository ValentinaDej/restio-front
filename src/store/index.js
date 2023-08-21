import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

import authReducer from './auth/authSlice';
import { customerOrdersReducer } from './customer/orders/ordersSlice';
import cartReducer from './cart/cartSlice';
import messagesReducer from './messages/messagesSlice';
import tableReducer from './tables/tableSlice';

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

const messagePersistConfig = {
  key: 'messages',
  storage,
};

const tablePersistConfig = {
  key: 'tables',
  storage,
};
const persistedMessagesReducer = persistReducer(messagePersistConfig, messagesReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedTableReducer = persistReducer(tablePersistConfig, tableReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    auth: authReducer,
    messages: persistedMessagesReducer,
    customerOrders: customerOrdersReducer,
    tables: persistedTableReducer,
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
