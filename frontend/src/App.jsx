import React from "react";
import { useAuth } from "./context/AuthContext.jsx";
import api from "./services/api.js";

function App() {
  const { user, isAuthenticated, loading, logout } = useAuth();

  return (
    <div style={{ padding: "40px 20px", textAlign: "center", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ color: "#2563eb", marginBottom: "12px", fontSize: "32px" }}>
        Store Rating Application
      </h1>
      <p style={{ fontSize: "18px", color: "#4b5563", marginBottom: "24px" }}>
        Frontend configured & ready!
      </p>
      <div
        style={{
          display: "inline-block",
          padding: "20px 28px",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          color: "#374151",
          textAlign: "left",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h3 style={{ margin: "0 0 12px 0", color: "#111827", fontSize: "18px" }}>
          Phase 4 Complete: AuthContext State
        </h3>
        <ul style={{ margin: 0, paddingLeft: "20px", lineHeight: "1.8", color: "#4b5563" }}>
          <li>
            Status: <strong>{loading ? "Loading..." : isAuthenticated ? "Authenticated" : "Not Authenticated"}</strong>
          </li>
          <li>User: <strong>{user ? `${user.name} (${user.role})` : "None"}</strong></li>
          <li>Token Storage: <strong>localStorage ("token", "user")</strong></li>
          <li>API Base URL: <code>{api.defaults.baseURL}</code></li>
        </ul>
        {isAuthenticated && (
          <button
            onClick={logout}
            style={{
              marginTop: "16px",
              padding: "8px 16px",
              backgroundColor: "#ef4444",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
