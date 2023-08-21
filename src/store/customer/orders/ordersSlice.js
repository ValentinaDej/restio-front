import { createSlice } from '@reduxjs/toolkit';
import { payOrders } from './asyncOperations';
import { toast } from 'react-hot-toast';

const initialState = {
  paymentInfo: {},
  isLoading: {
    payment: false,
  },
  error: undefined,
};

const customerOrdersSlice = createSlice({
  name: 'customerOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(payOrders.pending, (state) => {
        state.error = undefined;
        state.isLoading.payment = true;
      })
      .addCase(payOrders.fulfilled, (state, action) => {
        state.isLoading.payment = false;
        state.paymentInfo = action.payload;
      })
      .addCase(payOrders.rejected, (state, action) => {
        state.isLoading.payment = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { reducer: customerOrdersReducer } = customerOrdersSlice;
export const { actions: customerOrdersActions } = customerOrdersSlice;
