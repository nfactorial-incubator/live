import { Route } from "react-router-dom";
import RequireAuth from "./components/auth/RequireAuth";
import AuthRouterWrapper from "./components/auth/AuthRouterWrapper";

import { DashboardPage } from "./components/dashboard-page";
import { AuthenticationDialog } from "./components/auth";
import { PublicPage } from "./components/public-page";
import { NFactorialTheme } from "./components/nfactorial-theme";

function App() {
  return (
    <NFactorialTheme>
      <AuthRouterWrapper>
        <Route path="/" element={<PublicPage />} />
        <Route path="/login" element={<AuthenticationDialog />} />
        <Route
          path="/protected"
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
