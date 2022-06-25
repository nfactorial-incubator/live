import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const IsAuth = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return <> {isAuthenticated && <>{children}</>}</>;
};
