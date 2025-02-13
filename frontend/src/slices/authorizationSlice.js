//import { createSlice } from '@reduxjs/toolkit';

/*const initialState = {
  //user: '',
  token: localStorage.getItem('token') || null,
};

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    logIn: (state, action) => {
      
    },
    logOut: () => {

    },
  },
});

export const { } = authorizationSlice.actions;

export default authorizationSlice.reducer;*/

import { createSlice } from '@reduxjs/toolkit';

const initialData = localStorage.getItem('userId') !== 'undefined'
  ? JSON.parse(localStorage.getItem('userId'))
  : null;

const initialState = {
  username: initialData ? initialData.username : '',
  loggedIn: !!initialData,
  token: initialData ? initialData.token : '',
};

const authorizationSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setlogInUser(state, { payload }) {
      state.username = payload.username;
      state.loggedIn = true;
      state.token = payload.token;
    },
    setlogOutUser(state) {
      state.loggedIn = false;
      state.token = null;
    },
  },
});

export const { setlogInUser, setlogOutUser } = authorizationSlice.actions;
export default authorizationSlice.reducer;
