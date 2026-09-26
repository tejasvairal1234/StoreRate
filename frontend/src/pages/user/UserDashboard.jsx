import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "../../components/common/Common.css";

function UserDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <div className="ui-card">
        <div className="card-header">
          <div>
            <h1 className="card-title">Welcome back, {user?.name || "User"}!</h1>
            <p className="card-subtitle">
              Browse stores, explore community ratings, and submit your reviews.
            </p>
          </div>
        </div>

        {/* User Profile Summary */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            backgroundColor: "#f9fafb",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
          }}
        >
          <div>
            <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: "600", textTransform: "uppercase" }}>
              Email Address
            </span>
            <div style={{ fontSize: "15px", fontWeight: "600", color: "#111827", marginTop: "2px" }}>
              {user?.email || "N/A"}
            </div>
          </div>
          <div>
            <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: "600", textTransform: "uppercase" }}>
              Account Role
            </span>
            <div style={{ marginTop: "4px" }}>
              <span className="role-badge user">{user?.role || "user"}</span>
            </div>
          </div>
          <div>
            <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: "600", textTransform: "uppercase" }}>
              Primary Address
            </span>
            <div style={{ fontSize: "15px", color: "#374151", marginTop: "2px" }}>
              {user?.address || "Registered Customer"}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Action Cards */}
      <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#1f2937", marginBottom: "16px" }}>
        Quick Actions
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        <div className="ui-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "32px", marginBottom: "10px" }}>🏬</div>
            <h3 style={{ fontSize: "18px", color: "#111827", margin: "0 0 6px 0" }}>
              Browse Stores
            </h3>
            <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 16px 0", lineHeight: "1.5" }}>
              Explore registered stores, see customer ratings, and submit or update your ratings.
            </p>
          </div>
          <Link to="/user/stores" className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
            Explore Stores →
          </Link>
        </div>

        <div className="ui-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "32px", marginBottom: "10px" }}>🔒</div>
            <h3 style={{ fontSize: "18px", color: "#111827", margin: "0 0 6px 0" }}>
              Account Security
            </h3>
            <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 16px 0", lineHeight: "1.5" }}>
              Keep your credentials secure. Update your password anytime following our security guidelines.
            </p>
          </div>
          <Link to="/user/change-password" className="btn btn-secondary" style={{ alignSelf: "flex-start" }}>
            Change Password
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
