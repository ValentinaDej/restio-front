import { createSlice } from '@reduxjs/toolkit';

const messagesInitialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesInitialState,
  reducers: {
    addMessage(state, { payload }) {
      state.messages.push(payload);
    },
    deleteMessage(state, { payload }) {
      state.messages = state.messages.filter((message) => message.id !== payload);
    },
  },
});

export const { addMessage, deleteMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
