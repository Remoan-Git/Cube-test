import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/Login";
import Products from "./components/Products";
import ProtectedRoute from "./components/ProtectedRoute";
import LogoutButton from "./components/LogoutButton";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <LogoutButton />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/products"
            element={<ProtectedRoute element={<Products />} />}
          />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
