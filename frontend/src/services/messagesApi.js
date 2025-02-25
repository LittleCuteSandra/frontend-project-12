import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../utils/routes.js';

export const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({ baseUrl: routes.messagesPath(),
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers;
    },
   }),
  endpoints: (builder) => ({
    getMessages: builder.mutation({
      query: () => '',
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        method: 'POST',
        body: message,
      }),
    }),
  }),
});

export const {
  useGetMessagesMutation,
  useAddMessageMutation,
} = messagesApi;
