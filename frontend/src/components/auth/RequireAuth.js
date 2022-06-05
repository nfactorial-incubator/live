// import useAuth from "./useAuth";
import { useLocation, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const checkTokenExpirationMiddleware = (tokenToCheck) => {
  if (tokenToCheck && jwt_decode(tokenToCheck).exp < Date.now() / 1000) {
    localStorage.clear();
    return "";
  } else return tokenToCheck;
};

export default function RequireAuth({ children }) {
  // let auth = useAuth();

  let location = useLocation();

  const TOKEN = checkTokenExpirationMiddleware(
    localStorage.getItem("nf-token")
  );

  // !auth.user
  if (!TOKEN) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
