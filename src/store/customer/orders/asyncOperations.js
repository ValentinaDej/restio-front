import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const getOrdersByTableId = createAsyncThunk(
  'customerOrders/getOrdersByTableId',
  async (_, thunkAPI) => {
    try {
      const { tableId } = useParams();

      const response = await axios.get(``);
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
      } = await axios.post('https://et-back-23.vercel.app/transactions', ordersData);

      console.log(paymentInfo);
      return paymentInfo;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);
