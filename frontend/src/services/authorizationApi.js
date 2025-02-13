import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../utils/routes.js';

export const authorizationApi = createApi({
  reducerPath: 'authorization',
  baseQuery: fetchBaseQuery({ baseUrl: routes.serverPath() }),
  endpoints: (builder) => ({
    logInUser: builder.mutation({
      query: (userData) => ({
        url: routes.logInPage(),
        method: 'POST',
        body: userData,
      }),
    }),
    signUpUser: builder.mutation({
      query: (userData) => ({
        url: routes.signUpPage(),
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const {
  useLogInUserMutation,
  useSignUpUserMutation,
} = authorizationApi;
