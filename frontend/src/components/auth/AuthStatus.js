import React from "react";
import useAuth from "./useAuth";
import { Navigate, useNavigate } from "react-router-dom";

export default function AuthStatus() {
  let auth = useAuth();

  let navigate = useNavigate();

  if (!auth.user) {
    return <Navigate to={'/auth/login'}/>
  }

  return (
    <p>
      Welcome {auth.user}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}
