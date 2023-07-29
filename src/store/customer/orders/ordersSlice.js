import { createSlice } from '@reduxjs/toolkit';
import { payOrders } from './asyncOperations';
import { selectPayOrder } from './operations';

const initialState = {
  paymentInfo: {},
  dataParams: {
    amount: 0,
    order_id: '64c3bf98fdaa4b0120445a66',
    type: 'online',
  },
  selectedOrders: {
    payOrders: [],
    billOrders: [],
  },
  isLoading: false,
  error: undefined,
};

const customerOrdersSlice = createSlice({
  name: 'customerOrders',
  initialState,
  reducers: {
    selectPayOrder,
  },
  extraReducers: (builder) => {
    builder
      .addCase(payOrders.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(payOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentInfo = action.payload;
      })
      .addCase(payOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: customerOrdersReducer } = customerOrdersSlice;
export const { actions: customerOrdersActions } = customerOrdersSlice;
