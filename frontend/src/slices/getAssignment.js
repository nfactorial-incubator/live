import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOThmODQ1OGE0MzlkZTQxZGFmNTNiMiIsInVzZXJuYW1lIjoic2FtYXQiLCJyb2xlIjoibWVudG9yIiwiaWF0IjoxNjU0MzQ0NjgwLCJleHAiOjE2NTQzNjI2ODB9.pv6sFZ77Yc0tSDmiObWmRE8eYaW7sSUJaAm6BZpJ68w";

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
