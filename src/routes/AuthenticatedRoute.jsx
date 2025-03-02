import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const AuthenticatedRoute = ({ children, rwp }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default AuthenticatedRoute;
