import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api.js";
import Loading from "../../components/common/Loading.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import RatingStars from "../../components/common/RatingStars.jsx";
import "../../components/common/Common.css";

function OwnerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchOwnerDashboard = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const response = await api.get("/owner/dashboard");
        setData(response.data);
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message ||
            error.message ||
            "Failed to load store dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerDashboard();
  }, []);

  return (
    <div>
      <div className="ui-card">
        <div className="card-header">
          <div>
            <h1 className="card-title">Store Owner Dashboard</h1>
            <p className="card-subtitle">
              Monitor store reputation, overall ratings, and customer feedback.
            </p>
          </div>
          <Link to="/owner/ratings" className="btn btn-primary">
            View All Customer Ratings →
          </Link>
        </div>

        <ErrorMessage message={errorMessage} onDismiss={() => setErrorMessage("")} />

        {loading ? (
          <Loading message="Loading store overview..." />
        ) : !data?.store ? (
          <div className="empty-state">
            <div className="empty-icon">🏬</div>
            <div className="empty-title">No store assigned yet</div>
            <div className="empty-text">
              Please contact the system administrator to assign your store to this account.
            </div>
          </div>
        ) : (
          <div>
            {/* Store Information Card */}
            <div
              style={{
                backgroundColor: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "20px",
                marginBottom: "24px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <h2 style={{ fontSize: "22px", color: "#111827", margin: "0 0 6px 0", fontWeight: "700" }}>
                    🏬 {data.store.name}
                  </h2>
                  <p style={{ color: "#4b5563", fontSize: "14px", margin: "0 0 4px 0" }}>
                    ✉️ {data.store.email}
                  </p>
                  <p style={{ color: "#6b7280", fontSize: "14px", margin: 0 }}>
                    📍 {data.store.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon-wrapper stat-icon-ratings">⭐</div>
                <div className="stat-content">
                  <span className="stat-label">Average Store Rating</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "2px" }}>
                    <span className="stat-value">
                      {data.averageRating ? data.averageRating.toFixed(1) : "0.0"}
                    </span>
                    <RatingStars value={data.averageRating || 0} readOnly size={18} />
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon-wrapper stat-icon-users">👥</div>
                <div className="stat-content">
                  <span className="stat-label">Total Customer Ratings</span>
                  <span className="stat-value">{data.totalRatings || 0}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Action Navigation */}
      <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#1f2937", marginBottom: "16px" }}>
        Quick Management
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        <div className="ui-card">
          <div style={{ fontSize: "32px", marginBottom: "10px" }}>⭐</div>
          <h3 style={{ fontSize: "18px", color: "#111827", margin: "0 0 6px 0" }}>
            Customer Feedback
          </h3>
          <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 16px 0", lineHeight: "1.5" }}>
            View who rated your store, check their rating scores, and track review dates.
          </p>
          <Link to="/owner/ratings" className="btn btn-primary btn-sm">
            View Reviews
          </Link>
        </div>

        <div className="ui-card">
          <div style={{ fontSize: "32px", marginBottom: "10px" }}>🔒</div>
          <h3 style={{ fontSize: "18px", color: "#111827", margin: "0 0 6px 0" }}>
            Account Password
          </h3>
          <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 16px 0", lineHeight: "1.5" }}>
            Keep your business account credentials secure with periodic password updates.
          </p>
          <Link to="/owner/change-password" className="btn btn-secondary btn-sm">
            Change Password
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OwnerDashboard;
