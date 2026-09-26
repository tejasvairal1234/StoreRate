import React from "react";

function App() {
  return (
    <div style={{ padding: "40px 20px", textAlign: "center", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ color: "#2563eb", marginBottom: "12px", fontSize: "32px" }}>
        Store Rating Application
      </h1>
      <p style={{ fontSize: "18px", color: "#4b5563", marginBottom: "24px" }}>
        React + Vite Frontend initialized successfully!
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
          maxWidth: "480px",
          width: "100%",
        }}
      >
        <h3 style={{ margin: "0 0 12px 0", color: "#111827", fontSize: "18px" }}>
          Phase 2 Complete: React + Vite Setup
        </h3>
        <ul style={{ margin: 0, paddingLeft: "20px", lineHeight: "1.8", color: "#4b5563" }}>
          <li>React 19 + Vite initialized</li>
          <li>React Router DOM installed</li>
          <li>Axios installed for API calls</li>
          <li>Development and production build verified</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
