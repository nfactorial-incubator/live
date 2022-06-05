import React from "react";
import { authProviderHelper } from "./authProviderHelper";

// import { AuthContext } from "./AuthContext";

let AuthContext = React.createContext("");

export default function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  let signin = (newUser, callback) => {
    return authProviderHelper.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback) => {
    return authProviderHelper.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
