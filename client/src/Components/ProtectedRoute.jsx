import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/authService";

const ProtectedRoute = ({ children }) => {
  const isAuth = AuthService.isAuthenticated();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
