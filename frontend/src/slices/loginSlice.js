import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const login = createApi({
  reducerPath: "login",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://127.0.0.1:8080/auth`,
    prepareHeaders(headers) {
      headers.set("content-type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (patch) => ({
        url: `login`,
        method: "POST",
        body: patch,
      }),
    }),
  }),
});

export const { useLoginMutation } = login;
