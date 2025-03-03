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
    removeMessagesInStore: (state, { payload }) => {
      state.messages = state.messages.filter((message) => message.channelId !== payload.id);
    },
  },
});

export const {
  setMessages,
  addMessageInStore,
  removeMessagesInStore,
} = messagesSlice.actions;

export default messagesSlice.reducer;
