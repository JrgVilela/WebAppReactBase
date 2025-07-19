import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Users from "../pages/Users";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
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
