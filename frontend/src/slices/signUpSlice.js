import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const signUp = createApi({
  reducerPath: "signUp",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://127.0.0.1:8080/auth`,
    prepareHeaders(headers) {
      headers.set("content-type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (patch) => ({
        url: `register`,
        method: "POST",
        body: patch,
      }),
    }),
  }),
});

export const { useSignUpMutation } = signUp;
