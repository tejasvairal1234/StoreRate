import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api.js";
import Loading from "../../components/common/Loading.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import "../../components/common/Common.css";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchDashboardStats = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const response = await api.get("/admin/dashboard");
        setStats({
          totalUsers: response.data.totalUsers || 0,
          totalStores: response.data.totalStores || 0,
          totalRatings: response.data.totalRatings || 0,
        });
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message ||
            error.message ||
            "Failed to load administrative metrics."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div>
      <div className="ui-card">
        <div className="card-header">
          <div>
            <h1 className="card-title">System Administrator Dashboard</h1>
            <p className="card-subtitle">
              Overview of users, stores, and ratings platform activity.
            </p>
          </div>
        </div>

        <ErrorMessage message={errorMessage} onDismiss={() => setErrorMessage("")} />

        {loading ? (
          <Loading message="Loading dashboard statistics..." />
        ) : (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon-wrapper stat-icon-users">👥</div>
              <div className="stat-content">
                <span className="stat-label">Total Users</span>
                <span className="stat-value">{stats.totalUsers}</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper stat-icon-stores">🏬</div>
              <div className="stat-content">
                <span className="stat-label">Total Stores</span>
                <span className="stat-value">{stats.totalStores}</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper stat-icon-ratings">⭐</div>
              <div className="stat-content">
                <span className="stat-label">Total Ratings</span>
                <span className="stat-value">{stats.totalRatings}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Admin Quick Management Links */}
      <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#1f2937", marginBottom: "16px" }}>
        Management Hub
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        <div className="ui-card">
          <div style={{ fontSize: "32px", marginBottom: "10px" }}>👥</div>
          <h3 style={{ fontSize: "18px", color: "#111827", margin: "0 0 6px 0" }}>
            User Management
          </h3>
          <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 16px 0", lineHeight: "1.5" }}>
            View, filter, and inspect registered users across all roles (Admin, User, Owner).
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link to="/admin/users" className="btn btn-primary btn-sm">
              View All Users
            </Link>
            <Link to="/admin/users/create" className="btn btn-secondary btn-sm">
              + Add User
            </Link>
          </div>
        </div>

        <div className="ui-card">
          <div style={{ fontSize: "32px", marginBottom: "10px" }}>🏬</div>
          <h3 style={{ fontSize: "18px", color: "#111827", margin: "0 0 6px 0" }}>
            Store Management
          </h3>
          <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 16px 0", lineHeight: "1.5" }}>
            Create stores, assign store owners, and track customer rating averages.
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link to="/admin/stores" className="btn btn-primary btn-sm">
              View Stores
            </Link>
            <Link to="/admin/stores/create" className="btn btn-secondary btn-sm">
              + Add Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
