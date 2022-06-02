// import "./App.css";
import { ClippedDrawer } from "./components/drawer";
import { AuthenticationDialog } from "./components/auth";
import { NFactorialTheme } from "./components/nfactorial-theme";
import { ReactComponent as DefaultLoader } from "./assets/bean_eater.svg";

function App() {
  return (
    <NFactorialTheme>
      {/* <AuthenticationDialog /> */}
      {/* <DefaultLoader /> */}
      <ClippedDrawer />
    </NFactorialTheme>
  );
}

export default App;
