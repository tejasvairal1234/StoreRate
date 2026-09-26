import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api.js";

// 1. Create Authentication Context
const AuthContext = createContext();

// 2. Custom hook to use AuthContext easily in components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// 3. AuthProvider component to wrap our React app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore authentication state from localStorage when app loads / refreshes
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse stored user from localStorage:", error);
      // Clean up corrupt stored data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      // Call backend API: POST /api/auth/login
      const response = await api.post("/auth/login", { email, password });

      const { token: receivedToken, user: receivedUser } = response.data;

      // Save token and user information to localStorage
      localStorage.setItem("token", receivedToken);
      localStorage.setItem("user", JSON.stringify(receivedUser));

      // Update React state
      setToken(receivedToken);
      setUser(receivedUser);

      return { success: true, user: receivedUser };
    } catch (error) {
      // Extract helpful error message from backend response or network error
      const message =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred during login. Please try again.";

      return { success: false, message };
    }
  };

  // Logout function
  const logout = () => {
    // Clear storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Clear React state
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token && user),
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
