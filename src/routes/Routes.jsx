import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Users from "../pages/users/Index";
import LoginExpired from "../pages/LoginExpired";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/login_expired" element={<LoginExpired />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
