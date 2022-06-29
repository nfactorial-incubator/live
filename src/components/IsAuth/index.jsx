import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const ParentComponent = ({ children }) => {
  return <div>{children}</div>;
};

export const GrandParentComponent = () => {
  return (
    <IsAuth>
      <div>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
      </div>
    </IsAuth>
  );
};

export const IsAuth = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return;
  <>{isAuthenticated && <>{children}</>}</>;
};
