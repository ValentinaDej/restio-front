import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from 'api';

export const payOrders = createAsyncThunk(
  'customerOrders/payOrders',
  async (ordersData, thunkAPI) => {
    try {
      const {
        data: { paymentInfo },
      } = await instance.post('/transactions', ordersData);

      return paymentInfo;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);
