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
  tagTypes: ["assignment"],
  endpoints: (builder) => ({
    getAllAssignments: builder.query({
      query: () => `assignment`,
      providesTags: ["assignment"],
    }),
    getAssignment: builder.query({
      query: (id) => `assignment/${id}`,
    }),
    createAssignment: builder.mutation({
      query: (patch) => ({
        url: `assignment`,
        method: "POST",
        body: patch,
      }),
      invalidatesTags: ["assignment"],
    }),
    deleteAssignment: builder.mutation({
      query: (patch) => ({
        url: `assignment`,
        method: "DELETE",
        params: patch,
      }),
      invalidatesTags: ["assignment"],
    }),
    submitAssignment: builder.mutation({
      query: (patch) => ({
        url: `submission`,
        method: "POST",
        body: patch,
      }),
      invalidatesTags: ["assignment"],
    }),
  }),
});

export const {
  useGetAllAssignmentsQuery,
  useGetAssignmentQuery,
  useCreateAssignmentMutation,
  useDeleteAssignmentMutation,
  useSubmitAssignmentMutation,
} = createAssignment;
