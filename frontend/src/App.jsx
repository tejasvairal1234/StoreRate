import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RoleRoute from "./components/RoleRoute.jsx";
import MainLayout from "./components/layout/MainLayout.jsx";

// Reusable clean placeholder component for upcoming phases
function PagePlaceholder({ title, phase, role }) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        padding: "32px 24px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      <h1 style={{ fontSize: "24px", color: "#111827", margin: "0 0 8px 0" }}>
        {title}
      </h1>
      <p style={{ color: "#4b5563", fontSize: "15px", margin: "0 0 16px 0" }}>
        Temporary placeholder for <strong>{phase}</strong>. Access granted for role:{" "}
        <span
          style={{
            backgroundColor: "#eff6ff",
            color: "#1e40af",
            padding: "2px 8px",
            borderRadius: "4px",
            fontWeight: "600",
            fontSize: "13px",
          }}
        >
          {role}
        </span>
      </p>
      <div
        style={{
          padding: "12px 16px",
          backgroundColor: "#f9fafb",
          border: "1px dashed #d1d5db",
          borderRadius: "6px",
          color: "#6b7280",
          fontSize: "13px",
        }}
      >
        Navigation and common layout verified. Feature functionality will be implemented in its respective phase.
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes (No MainLayout) */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Authenticated Routes wrapped in ProtectedRoute & MainLayout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            {/* Normal User Routes */}
            <Route element={<RoleRoute allowedRoles={["user"]} />}>
              <Route
                path="/user/dashboard"
                element={<PagePlaceholder title="User Dashboard" phase="Phase 9" role="user" />}
              />
              <Route
                path="/user/stores"
                element={<PagePlaceholder title="Browse & Rate Stores" phase="Phase 10 & 11" role="user" />}
              />
              <Route
                path="/user/change-password"
                element={<PagePlaceholder title="Change Password" phase="Phase 12" role="user" />}
              />
            </Route>

            {/* Admin Routes */}
            <Route element={<RoleRoute allowedRoles={["admin"]} />}>
              <Route
                path="/admin/dashboard"
                element={<PagePlaceholder title="Admin Dashboard" phase="Phase 13" role="admin" />}
              />
              <Route
                path="/admin/users"
                element={<PagePlaceholder title="Manage Users" phase="Phase 14 & 15" role="admin" />}
              />
              <Route
                path="/admin/stores"
                element={<PagePlaceholder title="Manage Stores" phase="Phase 16 & 17" role="admin" />}
              />
              <Route
                path="/admin/change-password"
                element={<PagePlaceholder title="Change Password" phase="Phase 12" role="admin" />}
              />
            </Route>

            {/* Store Owner Routes */}
            <Route element={<RoleRoute allowedRoles={["owner"]} />}>
              <Route
                path="/owner/dashboard"
                element={<PagePlaceholder title="Owner Dashboard" phase="Phase 19" role="owner" />}
              />
              <Route
                path="/owner/ratings"
                element={<PagePlaceholder title="Store Ratings & Customers" phase="Phase 20" role="owner" />}
              />
              <Route
                path="/owner/change-password"
                element={<PagePlaceholder title="Change Password" phase="Phase 12" role="owner" />}
              />
            </Route>
          </Route>
        </Route>

        {/* Catch-all Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
