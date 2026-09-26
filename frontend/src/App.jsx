import React from "react";
import api from "./services/api.js";

function App() {
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
          Phase 3 Complete: Axios & Environment Config
        </h3>
        <ul style={{ margin: 0, paddingLeft: "20px", lineHeight: "1.8", color: "#4b5563" }}>
          <li>Axios instance created in <code>src/services/api.js</code></li>
          <li>Base URL configured: <code>{api.defaults.baseURL}</code></li>
          <li>JWT Request Interceptor configured</li>
          <li>Environment variables set via <code>.env.example</code></li>
        </ul>
      </div>
    </div>
  );
}

export default App;
