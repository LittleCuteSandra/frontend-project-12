import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authorizationSlice.js';
import channelsReducer from './channelsSlice.js';
import modalReducer from './modalSlice.js';
import messagesReducer from './messagesSlice.js';
import { authorizationApi } from '../services/authorizationApi.js';
import { channelsApi } from '../services/channelsApi.js';
import { messagesApi } from '../services/messagesApi.js';

export default configureStore({
  reducer: {
    auth: authReducer,
    channel: channelsReducer,
    modal: modalReducer,
    message: messagesReducer,
    [authorizationApi.reducerPath]: authorizationApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    authorizationApi.middleware,
    channelsApi.middleware,
    messagesApi.middleware,
  ),
});
