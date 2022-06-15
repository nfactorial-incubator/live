import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TOKEN = localStorage.getItem("nf-token");

export const getAllUsers = createApi({
  reducerPath: "getAllUsers",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://127.0.0.1:8080/api/user`,
    prepareHeaders(headers) {
      headers.set("Authorization", `Bearer ${TOKEN}`);
      return headers;
    },
  }),
  tagTypes: ["post", "user"],
  endpoints: (builder) => ({
    getAllOfUs: builder.query({
      query: (name) => `all`,
      providesTags: ["post"],
    }),
    getOnlyMe: builder.query({
      query: (name) => `profile`,
      providesTags: ["user"],
    }),
    increaseCounter: builder.mutation({
      query: (post) => ({
        url: `increaseCounter`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["post"],
    }),
  }),
});

export const {
  useGetAllOfUsQuery,
  useGetOnlyMeQuery,
  useIncreaseCounterMutation,
} = getAllUsers;
