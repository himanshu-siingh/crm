import React, { createContext, useContext, useState } from "react";
import SessionService from "../services/SessionService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(SessionService.get.user());

  const login = (response) => {
    SessionService.set.header(response.token);
    SessionService.set.user(response.data);
    setUser(response.data);
  };

  const logout = () => {
    localStorage.removeItem("srm-user");
    setUser(null);
  };

  const isAuthenticated = () => {
    return Object.values(user).length ? true : false;
  };

  const hasPermission = (permission) => {
    if (user.isAdmin == 1) return true;
    return user.permissions?.includes(permission);
  };

  const value = {
    user,
    login,
    logout,
    hasPermission,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
