import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TOKEN = localStorage.getItem("nf-token");

export const getAllAssignments = createApi({
  reducerPath: "getAllAssignments",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://127.0.0.1:8080/api/`,
    prepareHeaders(headers) {
      headers.set("Authorization", `Bearer ${TOKEN}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllOfthem: builder.query({
      query: (name) => `hw/assignment`,
    }),
  }),
});

export const { useGetAllOfthemQuery } = getAllAssignments;
