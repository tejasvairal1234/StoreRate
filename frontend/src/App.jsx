import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RoleRoute from "./components/RoleRoute.jsx";

// Temporary placeholder components for role routes until their dedicated phases
function UserDashboardPlaceholder() {
  return (
    <div style={{ padding: "40px 20px", textAlign: "center", fontFamily: "system-ui, sans-serif" }}>
      <h2 style={{ color: "#2563eb", marginBottom: "8px" }}>User Dashboard</h2>
      <p style={{ color: "#4b5563" }}>
        Temporary placeholder for Phase 9. Access granted for role: <strong>user</strong>.
      </p>
    </div>
  );
}

function AdminDashboardPlaceholder() {
  return (
    <div style={{ padding: "40px 20px", textAlign: "center", fontFamily: "system-ui, sans-serif" }}>
      <h2 style={{ color: "#2563eb", marginBottom: "8px" }}>Admin Dashboard</h2>
      <p style={{ color: "#4b5563" }}>
        Temporary placeholder for Phase 13. Access granted for role: <strong>admin</strong>.
      </p>
    </div>
  );
}

function OwnerDashboardPlaceholder() {
  return (
    <div style={{ padding: "40px 20px", textAlign: "center", fontFamily: "system-ui, sans-serif" }}>
      <h2 style={{ color: "#2563eb", marginBottom: "8px" }}>Store Owner Dashboard</h2>
      <p style={{ color: "#4b5563" }}>
        Temporary placeholder for Phase 19. Access granted for role: <strong>owner</strong>.
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Authenticated Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Normal User Routes (Role: user) */}
          <Route element={<RoleRoute allowedRoles={["user"]} />}>
            <Route path="/user/dashboard" element={<UserDashboardPlaceholder />} />
          </Route>

          {/* Admin Routes (Role: admin) */}
          <Route element={<RoleRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPlaceholder />} />
          </Route>

          {/* Store Owner Routes (Role: owner) */}
          <Route element={<RoleRoute allowedRoles={["owner"]} />}>
            <Route path="/owner/dashboard" element={<OwnerDashboardPlaceholder />} />
          </Route>
        </Route>

        {/* Catch-all Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
