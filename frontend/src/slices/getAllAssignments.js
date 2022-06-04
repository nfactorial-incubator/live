import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOThmODQ1OGE0MzlkZTQxZGFmNTNiMiIsInVzZXJuYW1lIjoic2FtYXQiLCJyb2xlIjoibWVudG9yIiwiaWF0IjoxNjU0MzQ0NjgwLCJleHAiOjE2NTQzNjI2ODB9.pv6sFZ77Yc0tSDmiObWmRE8eYaW7sSUJaAm6BZpJ68w";

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
