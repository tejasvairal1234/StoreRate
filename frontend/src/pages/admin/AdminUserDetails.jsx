import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api.js";
import Loading from "../../components/common/Loading.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import RatingStars from "../../components/common/RatingStars.jsx";
import "../../components/common/Common.css";

function AdminUserDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const response = await api.get(`/admin/users/${id}`);
        setData(response.data);
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message ||
            error.message ||
            "Failed to retrieve user details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) {
    return <Loading message="Loading account details..." />;
  }

  if (errorMessage) {
    return (
      <div className="ui-card">
        <ErrorMessage message={errorMessage} />
        <Link to="/admin/users" className="btn btn-secondary btn-sm">
          ← Back to Users
        </Link>
      </div>
    );
  }

  const user = data?.user;
  const store = data?.store;

  return (
    <div>
      <div className="ui-card">
        <div className="card-header">
          <div>
            <h1 className="card-title">User Account Details</h1>
            <p className="card-subtitle">
              Inspect user profile details and associated store information.
            </p>
          </div>
          <Link to="/admin/users" className="btn btn-secondary btn-sm">
            ← Back to Users
          </Link>
        </div>

        {user && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
              backgroundColor: "#f9fafb",
              padding: "24px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              marginBottom: "24px",
            }}
          >
            <div>
              <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: "600", textTransform: "uppercase" }}>
                Full Name
              </span>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "#111827", marginTop: "2px" }}>
                {user.name}
              </div>
            </div>

            <div>
              <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: "600", textTransform: "uppercase" }}>
                Email Address
              </span>
              <div style={{ fontSize: "15px", color: "#1f2937", marginTop: "4px" }}>
                {user.email}
              </div>
            </div>

            <div>
              <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: "600", textTransform: "uppercase" }}>
                System Role
              </span>
              <div style={{ marginTop: "4px" }}>
                <span className={`role-badge ${user.role}`}>{user.role}</span>
              </div>
            </div>

            <div>
              <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: "600", textTransform: "uppercase" }}>
                Physical Address
              </span>
              <div style={{ fontSize: "15px", color: "#374151", marginTop: "4px", lineHeight: "1.4" }}>
                {user.address || "N/A"}
              </div>
            </div>
          </div>
        )}

        {/* If user is Store Owner, display their store information */}
        {user?.role === "owner" && (
          <div style={{ marginTop: "20px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#111827", marginBottom: "14px" }}>
              Assigned Store Information
            </h2>

            {store ? (
              <div
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "20px",
                  backgroundColor: "#ffffff",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                  <div>
                    <h3 style={{ fontSize: "20px", color: "#111827", margin: "0 0 6px 0" }}>
                      🏬 {store.name}
                    </h3>
                    <p style={{ color: "#4b5563", fontSize: "14px", margin: "0 0 4px 0" }}>
                      ✉️ {store.email}
                    </p>
                    <p style={{ color: "#6b7280", fontSize: "14px", margin: 0 }}>
                      📍 {store.address}
                    </p>
                  </div>

                  <div
                    style={{
                      textAlign: "right",
                      backgroundColor: "#f9fafb",
                      padding: "12px 18px",
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: "600", textTransform: "uppercase" }}>
                      Average Store Rating
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                      <RatingStars value={store.averageRating || 0} readOnly size={18} />
                      <span style={{ fontSize: "18px", fontWeight: "800", color: "#111827" }}>
                        {store.averageRating ? store.averageRating.toFixed(1) : "0.0"}
                      </span>
                    </div>
                    <span style={{ fontSize: "12px", color: "#6b7280" }}>
                      Based on {store.totalRatings || 0} customer reviews
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  padding: "18px",
                  backgroundColor: "#f9fafb",
                  borderRadius: "8px",
                  color: "#6b7280",
                  fontSize: "14px",
                }}
              >
                No store has been assigned to this store owner yet. You can create one from the{" "}
                <Link to="/admin/stores/create" style={{ color: "#2563eb", fontWeight: "600" }}>
                  Add Store
                </Link>{" "}
                page.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminUserDetails;
