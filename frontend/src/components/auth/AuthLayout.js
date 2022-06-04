import { Outlet } from "react-router-dom";
import AuthStatus from "./AuthStatus";

export default function AuthLayout() {
  return (
    <div>
      <AuthStatus />

      <Outlet />
    </div>
  );
}
