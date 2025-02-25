import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, { payload }) => {
      state.messages = payload;
    },
    addMessageInStore: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
  },
});

export const {
  setMessages,
  addMessageInStore
} = messagesSlice.actions;

export default messagesSlice.reducer;
