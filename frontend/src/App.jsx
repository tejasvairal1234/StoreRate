import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route redirects to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Temporary placeholder targets for role-based redirects */}
        <Route
          path="/user/dashboard"
          element={
            <div style={{ padding: "40px 20px", textAlign: "center" }}>
              <h2>User Dashboard (Coming in Phase 9)</h2>
              <p>You have successfully logged in as a normal user!</p>
            </div>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <div style={{ padding: "40px 20px", textAlign: "center" }}>
              <h2>Admin Dashboard (Coming in Phase 13)</h2>
              <p>You have successfully logged in as an administrator!</p>
            </div>
          }
        />
        <Route
          path="/owner/dashboard"
          element={
            <div style={{ padding: "40px 20px", textAlign: "center" }}>
              <h2>Store Owner Dashboard (Coming in Phase 19)</h2>
              <p>You have successfully logged in as a store owner!</p>
            </div>
          }
        />
        <Route path="/register" element={<Register />} />

        {/* Fallback for any other path */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
