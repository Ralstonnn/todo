import { Routes, Route, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { LoginPage } from "./pages/Auth/Login/LoginPage";
import { RegistrationPage } from "./pages/Auth/Registration/RegistrationPage";
import "./styles/sass/flex.scss";
import "./styles/sass/template.scss";
import "./styles/sass/typography.scss";
import { useEffect, useState } from "react";

// TODO: Add additional todos to a task and something like folders

function App() {
  let navigate = useNavigate()

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("userId") === null ? false : true
  );

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("userId") === null ? false : true)
    if (isLoggedIn) navigate('/')
  }, [localStorage.getItem("userId")])

  return (
    <div className="container-main-100 bg-prm">
      <Routes>
        {isLoggedIn && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/todo" element={<Home />} />
          </>
        )}
        {!isLoggedIn && (
          <>
            <Route path="*" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/registration" element={<RegistrationPage />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
