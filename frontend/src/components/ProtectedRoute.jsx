import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

/**
 * ProtectedRoute component
 * Ensures only authenticated users can access the wrapped routes.
 * If authentication state is still loading from localStorage, shows a loading indicator.
 * If user is not authenticated, redirects to /login.
 * Otherwise, renders the child routes via <Outlet /> or children prop.
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // 1. While reading localStorage session, show loading screen
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          color: "#4b5563",
        }}
      >
        <p>Loading session...</p>
      </div>
    );
  }

  // 2. If not authenticated, redirect to /login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 3. Authenticated: render nested routes or children
  return children ? children : <Outlet />;
}

export default ProtectedRoute;
