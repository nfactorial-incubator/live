import { configureStore } from "@reduxjs/toolkit";
import { signUp } from "../slices/signUpSlice";
import { createAssignment } from "../slices/homeworksSlice";
import { login } from "../slices/loginSlice";
import { getAllUsers } from "../slices/getAllUsersSlice";

export const store = configureStore({
  reducer: {
    [signUp.reducerPath]: signUp.reducer,
    [login.reducerPath]: login.reducer,
    [createAssignment.reducerPath]: createAssignment.reducer,
    [getAllUsers.reducerPath]: getAllUsers.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      signUp.middleware,
      login.middleware,
      createAssignment.middleware,
      getAllUsers.middleware
    );
  },
});
