// import useAuth from "./useAuth";
import { useLocation, Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  // let auth = useAuth();
  let location = useLocation();

  const TOKEN = localStorage.getItem("nf-token");

  // !auth.user
  if (!TOKEN) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  return children;
}
