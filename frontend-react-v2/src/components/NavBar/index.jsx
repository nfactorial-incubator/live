import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { CanAccess } from "../CanAccess";
import { IsAuth } from "../IsAuth";

export function NavBar() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>

      <IsAuth>
        <Link to="/">Home</Link>
      </IsAuth>

      <IsAuth>
        <Link to="/check-in-out">CheckInOut</Link>
      </IsAuth>

      <CanAccess permissions={["users.list"]}>
        <Link to="/users">Users</Link>
      </CanAccess>

      <CanAccess permissions={["metrics.list"]}>
        <Link to="/metrics">Metrics</Link>
      </CanAccess>

      <IsAuth>
        <>
          <span>Welcome, {user?.nickname}!</span>
          <button data-testid="logout-button" onClick={() => signOut()}>
            Logout
          </button>
        </>
      </IsAuth>
    </div>
  );
}
