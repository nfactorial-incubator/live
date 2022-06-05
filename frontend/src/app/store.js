import { configureStore } from "@reduxjs/toolkit";
import { getAllAssignments } from "../slices/getAllAssignments";
import { getAssignment } from "../slices/getAssignment";
import { signUp } from "../slices/signUpSlice";
import { createAssignment } from "../slices/homeworksSlice";
import { submitAssignment } from "../slices/submissionSlice";

export const store = configureStore({
  reducer: {
    [getAllAssignments.reducerPath]: getAllAssignments.reducer,
    [getAssignment.reducerPath]: getAssignment.reducer,
    [signUp.reducerPath]: signUp.reducer,
    [createAssignment.reducerPath]: createAssignment.reducer,
    [submitAssignment.reducerPath]: submitAssignment.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(getAllAssignments.middleware);
  },
});
