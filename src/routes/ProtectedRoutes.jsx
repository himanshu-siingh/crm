import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, rwp }) => {
  const { hasPermission, isAuthenticated } = useAuth();
  console.log(isAuthenticated());
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  if (rwp && !hasPermission(rwp)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

export default ProtectedRoute;
