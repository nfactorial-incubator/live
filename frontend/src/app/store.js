import { configureStore } from "@reduxjs/toolkit";
import { getAllAssignments } from "../slices/getAllAssignments";
import { getAssignment } from "../slices/getAssignment";

export const store = configureStore({
  reducer: {
    [getAllAssignments.reducerPath]: getAllAssignments.reducer,
    [getAssignment.reducerPath]: getAssignment.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(getAllAssignments.middleware);
  },
});
