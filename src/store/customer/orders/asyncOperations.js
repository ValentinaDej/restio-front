import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const getOrdersByTableId = createAsyncThunk(
  'customerOrders/getOrdersByTableId',
  async (_, thunkAPI) => {
    try {
      const { tableId } = useParams();
      console.log(tableId);

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
      } = await axios.post('http://localhost:3001/transactions', ordersData);
      return paymentInfo;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);
