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
  tagTypes: ["post"],
  endpoints: (builder) => ({
    getAllOfUs: builder.query({
      query: (name) => `all`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "post",
                _id,
              })),
              "post",
            ]
          : ["post"],
    }),
    increaseCounter: builder.mutation({
      query: (post) => ({
        url: `increaseCounter`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: (result, error, arg) => {
        console.log(arg);
        return [{ type: "post", id: arg._id }];
      },
    }),
  }),
});

export const { useGetAllOfUsQuery, useIncreaseCounterMutation } = getAllUsers;
