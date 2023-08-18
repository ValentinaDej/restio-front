import { createSlice } from '@reduxjs/toolkit';

const cartInitialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    addProduct(state, { payload }) {
      const item = state.cart.find((item) => item.id === payload.id);
      if (item) {
        item.quantity++;
      } else {
        state.cart.push({ ...payload, quantity: 1 });
      }
    },
    addCommentForChef(state, { payload }) {
      const item = state.cart.find((item) => item.id === payload.id);
      if (item) {
        item.comment = payload.comment;
      }
    },
    increaseQuantity(state, { payload }) {
      const item = state.cart.find((item) => item.id === payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity(state, { payload }) {
      const item = state.cart.find((item) => item.id === payload);
      if (item) item.quantity -= 1;
    },
    deleteProduct(state, { payload }) {
      state.cart = state.cart.filter((product) => product.id !== payload);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  addCommentForChef,
} = cartSlice.actions;

export default cartSlice.reducer;
