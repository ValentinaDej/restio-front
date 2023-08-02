import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginPersonnel } from 'api/auth';
import { toast } from 'react-hot-toast';

const initialState = {
  name: '',
  token: '',
  refreshToken: '',
  restaurantId: '',
  role: '',
  userId: '',
  isLoading: false,
  isError: false,
};

export const loginUser = createAsyncThunk('auth/loginUser', async (user, thunkAPI) => {
  try {
    const res = await loginPersonnel(user);
    localStorage.setItem('userData', JSON.stringify(res));
    toast.success('Login Successful');
    return res;
  } catch (error) {
    toast.error(error.message, { toastId: 'login-error' });
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const { name, token, refreshToken, restaurantId, role, userId } = action.payload;
        state.name = name;
        state.token = token;
        state.refreshToken = refreshToken;
        state.restaurantId = restaurantId;
        state.role = role;
        state.userId = userId;
        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        console.error(action.error.message);
      });
  },
});

export default authSlice.reducer;
