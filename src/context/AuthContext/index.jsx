import { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { api } from "../../services/api";
import { setAuthorizationHeader } from "../../services/interceptors";
import {
  createTokenCookies,
  getToken,
  removeTokenCookies,
} from "../../utils/tokenCookies";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loadingUserData, setLoadingUserData] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const token = getToken();
  const isAuthenticated = Boolean(token);
  const userData = user;

  const signIn = async ({ nickname, password }) => {
    try {
      const response = await api.post("/auth/login", { nickname, password });
      const { token, permissions, roles } = response.data;

      createTokenCookies(token);
      setUser({ nickname, permissions, roles });
      setAuthorizationHeader(api.defaults, token);
    } catch (error) {
      const err = error;
      throw err;
    }
  };

  const signUp = async (values) => {
    try {
      const response = await api.post("/auth/register", values);
      const { token, permissions, roles } = response.data;

      createTokenCookies(token);
      setUser({ nickname: values.nickname, permissions, roles });
      setAuthorizationHeader(api.defaults, token);
    } catch (error) {
      const err = error;
      throw err;
    }
  };

  const signOut = (redirectTo = "/login") => {
    removeTokenCookies();
    setUser(null);
    setLoadingUserData(false);
    navigate(redirectTo);
  };

  useEffect(() => {
    if (!token) signOut(pathname);
  }, [pathname, token]);

  useEffect(() => {
    const token = getToken();

    async function getUserData() {
      setLoadingUserData(true);

      try {
        const response = await api.get("/api/user/me");

        if (response?.data) {
          const user = response.data;
          console.log(user);
          setUser(user);
        }
      } catch (error) {
        signOut();
      }

      setLoadingUserData(false);
    }

    if (token) {
      setAuthorizationHeader(api.defaults, token);
      getUserData();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user: userData,
        loadingUserData,
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
