import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    user: null,
  });

  const login = async (username, password) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      const { token, refreshToken, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      setAuth({
        token,
        refreshToken,
        user,
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Invalid username or password");
      } else {
        alert("An error occurred during login");
      }
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await axiosInstance.get("/auth/me");
      setAuth((prevState) => ({
        ...prevState,
        user: response.data,
      }));
    } catch (error) {
      console.error("Failed to fetch current user:", error);
    }
  };

  const refreshAuthSession = async () => {
    try {
      const response = await axiosInstance.post("/auth/refresh", {
        refreshToken: auth.refreshToken,
        expiresInMins: 30,
      });
      const { token } = response.data;

      localStorage.setItem("token", token);

      setAuth((prevState) => ({
        ...prevState,
        token,
      }));
    } catch (error) {
      console.error("Failed to refresh token:", error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setAuth({ token: null, refreshToken: null, user: null });
  };

// refresh token every 5 min

  useEffect(() => {
    if (auth.token) {
      fetchCurrentUser();
    }

    const interval = setInterval(() => {
      if (auth.refreshToken) {
        refreshAuthSession();
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [auth.token, auth.refreshToken]);

  return (
    <AuthContext.Provider value={{ auth, login, logout, refreshAuthSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
