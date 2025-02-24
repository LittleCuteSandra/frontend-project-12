import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelID: '1',
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelID = payload;
    },
    setChannels: (state, { payload }) => {
      state.channels = payload;
    },
    addChannelInStore: (state, { payload }) => {
      state.channels = [...state.channels, payload];
    },
    removeChannelInStore: (state, { payload }) => {
      // ещё удаление всех сообщений этого канала добавить
      state.channels = state.channels.filter((channel) => channel.id !== payload);
    },
    renameChannelInStore: (state, { payload }) => {
      const needChannel = state.channels.find((channel) => channel.id === payload.id);
      needChannel.name = payload.name;
    },
  },
});

export const { 
  setChannels, 
  setCurrentChannel, 
  addChannelInStore, 
  removeChannelInStore, 
  renameChannelInStore 
} = channelsSlice.actions;

export default channelsSlice.reducer;
