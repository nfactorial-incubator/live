import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TOKEN = localStorage.getItem("nf-token");

export const getAssignment = createApi({
  reducerPath: "getAssignment",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://127.0.0.1:8080/api/`,
    prepareHeaders(headers) {
      headers.set("Authorization", `Bearer ${TOKEN}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAssignment: builder.query({
      query: (id) => `hw/assignment/${id}`,
    }),
  }),
});

export const { useGetAssignmentQuery } = getAssignment;
