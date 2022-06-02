import { configureStore } from "@reduxjs/toolkit";
import { getAllAssignments } from "../slices/getAllAssignments";

export const store = configureStore({
  reducer: {
    [getAllAssignments.reducerPath]: getAllAssignments.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(getAllAssignments.middleware);
  },
});
