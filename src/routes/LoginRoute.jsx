import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const LoginRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default LoginRoute;
