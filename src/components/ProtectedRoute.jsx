import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { auth } = useContext(AuthContext);
  return auth.token ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
