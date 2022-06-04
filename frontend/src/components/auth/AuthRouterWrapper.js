import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./AuthProvider";
import AuthLayout from "./AuthLayout";

export default function AuthRouterWrapper({ children }) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
        {children}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
