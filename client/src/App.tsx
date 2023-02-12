import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";

function App() {
  return (
    <Routes>
      <Route path="">
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="account">
          <Route index element={<AccountPage />} />
          <Route path=":accountSection" element={<AccountPage />}>
            <Route path=":action" element={<AccountPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
