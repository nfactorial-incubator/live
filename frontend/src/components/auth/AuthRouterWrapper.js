import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./AuthProvider";
import { PublicAppBar } from "../public-app-bar";

export default function AuthRouterWrapper({ children }) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PublicAppBar />}>{children}</Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
