import { configureStore } from '@reduxjs/toolkit';
import authorizationSlice from './authorizationSlice.js';
import { authorizationApi } from '../services/authorizationApi.js';

export default configureStore({
  reducer: {
    authorization: authorizationSlice,
    [authorizationApi.reducerPath]: authorizationApi.reducer,
    //[channelsApi.reducerPath]: channelsApi.reducer, надо сделать их
    //[messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authorizationApi.middleware),
});


/*export!!!!!!!!!!!!! НЕ ДЕФАУЛТ const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});*/