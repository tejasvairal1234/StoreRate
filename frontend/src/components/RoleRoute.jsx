import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

/**
 * RoleRoute component
 * Ensures that the authenticated user has one of the allowed roles.
 * Example: <RoleRoute allowedRoles={["admin"]} />
 * - If still loading auth state, shows loading message.
 * - If not authenticated, redirects to /login.
 * - If user's role is not permitted, redirects to /unauthorized.
 * - If authorized, renders child routes via <Outlet /> or children prop.
 */
function RoleRoute({ allowedRoles = [], children }) {
  const { user, isAuthenticated, loading } = useAuth();

  // 1. While loading session, show loading message
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

  // 3. If authenticated but role is not allowed, redirect to /unauthorized
  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 4. Authorized: render child routes or children
  return children ? children : <Outlet />;
}

export default RoleRoute;
