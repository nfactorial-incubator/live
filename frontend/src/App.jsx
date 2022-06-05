import { Route } from "react-router-dom";
import RequireAuth from "./components/auth/RequireAuth";
import AuthRouterWrapper from "./components/auth/AuthRouterWrapper";

import { DashboardPage } from "./components/dashboard-page";
import { SignUp } from "./components/auth/SignUp";
import { Login } from "./components/auth/Login";
import { PublicPage } from "./components/public-page";
import { NFactorialTheme } from "./components/nfactorial-theme";

function App() {
  return (
    <NFactorialTheme>
      <AuthRouterWrapper>
        <Route path="test/*" element={<DashboardPage />} />

        <Route path="/" element={<PublicPage />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route
          path="classroom/*"
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }
        />
      </AuthRouterWrapper>
    </NFactorialTheme>
  );
}

export default App;
