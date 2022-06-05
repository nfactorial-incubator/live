import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TOKEN = localStorage.getItem("nf-token");

export const createAssignment = createApi({
  reducerPath: "createAssignment",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://127.0.0.1:8080/api/hw`,
    prepareHeaders(headers) {
      headers.set("content-type", "application/json");
      headers.set("Authorization", `Bearer ${TOKEN}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createAssignment: builder.mutation({
      query: (patch) => ({
        url: `assignment`,
        method: "POST",
        body: patch,
      }),
    }),
  }),
});

export const { useCreateAssignmentMutation } = createAssignment;
