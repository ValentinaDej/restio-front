import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from 'api';
import { useParams } from 'react-router-dom';

export const getOrdersByTableId = createAsyncThunk(
  'customerOrders/getOrdersByTableId',
  async (_, thunkAPI) => {
    try {
      const { tableId } = useParams();

      const response = await instance.get(``);
      return response.data.orders;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

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
