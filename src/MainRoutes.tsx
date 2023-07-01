import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import AuthenticationGuard from "./components/AuthenticationGuard";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import RedirectPage from "./pages/RedirectPage";

function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={
            <AuthenticationGuard>
              <AppLayout>
                <HomePage />
              </AppLayout>
            </AuthenticationGuard>
          }
        ></Route>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/" element={<RedirectPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;
