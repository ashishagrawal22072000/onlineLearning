import React from "react";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  return !token ? <Navigate to="/login" replace /> : children;
};

export default ProtectedRoute;
