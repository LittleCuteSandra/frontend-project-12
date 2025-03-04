/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: localStorage.getItem('username') || '',
  token: localStorage.getItem('token') || '',
  isLoggedIn: !!localStorage.getItem('token'),
};

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setUserLoggedIn: (state, { payload }) => {
      state.username = payload.username;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
    setUserLoggedOut: (state) => {
      state.username = '';
      state.token = '';
      state.isLoggedIn = false;
    },
  },
});

export const { setUserLoggedIn, setUserLoggedOut } = authorizationSlice.actions;

export default authorizationSlice.reducer;
