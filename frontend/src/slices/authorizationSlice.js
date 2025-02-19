import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  token: localStorage.getItem('token') || '',
  isLoggedIn: false,
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
