import { configureStore } from "@reduxjs/toolkit";
import { getAllAssignments } from "../slices/getAllAssignments";
import { getAssignment } from "../slices/getAssignment";
import { signUp } from "../slices/signUpSlice";
import { createAssignment } from "../slices/homeworksSlice";
import { submitAssignment } from "../slices/submissionSlice";
import { login } from "../slices/loginSlice";
import { getAllUsers } from "../slices/getAllUsersSlice";

export const store = configureStore({
  reducer: {
    [getAllAssignments.reducerPath]: getAllAssignments.reducer,
    [getAssignment.reducerPath]: getAssignment.reducer,
    [signUp.reducerPath]: signUp.reducer,
    [login.reducerPath]: login.reducer,
    [createAssignment.reducerPath]: createAssignment.reducer,
    [submitAssignment.reducerPath]: submitAssignment.reducer,
    [getAllUsers.reducerPath]: getAllUsers.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      getAllAssignments.middleware,
      getAssignment.middleware,
      signUp.middleware,
      login.middleware,
      createAssignment.middleware,
      submitAssignment.middleware,
      getAllUsers.middleware
    );
  },
});
