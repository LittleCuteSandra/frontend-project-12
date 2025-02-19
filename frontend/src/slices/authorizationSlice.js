import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  token: localStorage.getItem('token') || '',
};

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setUserLoggedIn: (state, { payload }) => {
      state.username = payload.username;
      state.token = payload.token;
    },
    setUserLoggedOut: (state) => {
      state.username = '';
      state.token = '';
    },
  },
});

export const { setUserLoggedIn, setUserLoggedOut } = authorizationSlice.actions;

export default authorizationSlice.reducer;
