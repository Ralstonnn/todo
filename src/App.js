// STYLES
import { Home } from "./pages/Home/Home";
import { LoginPage } from "./pages/Auth/Login/LoginPage";
import { RegistrationPage } from "./pages/Auth/Registration/RegistrationPage";
import "./styles/sass/flex.scss";
import "./styles/sass/template.scss";
import "./styles/sass/typography.scss";

// TODO: Add additional todos to a task and something like folders

function App() {
  return (
    <div className="container-main-100 bg-prm">
      {/* <Home /> */}
      <LoginPage />
      {/* <RegistrationPage /> */}
    </div>
  );
}

export default App;
