import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

/**
 * Unauthorized (403) Page
 * Shown when an authenticated user attempts to access a page restricted to another role.
 */
function Unauthorized() {
  const { user } = useAuth();

  // Helper to direct user back to their designated role dashboard
  const getDashboardPath = () => {
    if (user?.role === "admin") return "/admin/dashboard";
    if (user?.role === "owner") return "/owner/dashboard";
    if (user?.role === "user") return "/user/dashboard";
    return "/login";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f3f4f6",
        padding: "24px 16px",
        boxSizing: "border-box",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          border: "1px solid #e5e7eb",
          padding: "36px 28px",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontSize: "64px",
            fontWeight: "800",
            color: "#dc2626",
            lineHeight: "1",
            marginBottom: "12px",
          }}
        >
          403
        </div>

        <h1
          style={{
            fontSize: "22px",
            fontWeight: "700",
            color: "#111827",
            margin: "0 0 10px 0",
          }}
        >
          Access Denied
        </h1>

        <p
          style={{
            fontSize: "15px",
            color: "#4b5563",
            lineHeight: "1.5",
            margin: "0 0 24px 0",
          }}
        >
          You do not have permission to access this page. Your account role is{" "}
          <strong>{user?.role || "unassigned"}</strong>.
        </p>

        <Link
          to={getDashboardPath()}
          style={{
            display: "inline-block",
            padding: "11px 20px",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "15px",
            transition: "background-color 0.2s",
          }}
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;
