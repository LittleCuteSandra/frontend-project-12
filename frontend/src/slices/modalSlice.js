import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: '',
  isShown: false,
  channelID: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      state.type = payload.type;
      state.isShown = true;
      state.channelID = payload.channelID;
    },
    hideModal: (state) => {
      state.type = '';
      state.isShown = false;
      state.channelID = '';
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
