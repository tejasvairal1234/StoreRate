import React, { useState, useEffect, useCallback } from "react";
import api from "../../services/api.js";
import Loading from "../../components/common/Loading.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import RatingStars from "../../components/common/RatingStars.jsx";
import "../../components/common/Common.css";

function OwnerRatings() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [sortBy, setSortBy] = useState("date");
  const [order, setOrder] = useState("desc");

  const fetchRatings = useCallback(async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await api.get("/owner/ratings", {
        params: { sortBy, order },
      });
      setRatings(response.data || []);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to load store ratings."
      );
    } finally {
      setLoading(false);
    }
  }, [sortBy, order]);

  useEffect(() => {
    fetchRatings();
  }, [fetchRatings]);

  const handleSort = (columnKey) => {
    if (sortBy === columnKey) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(columnKey);
      setOrder("desc");
    }
  };

  const renderSortArrow = (columnKey) => {
    if (sortBy !== columnKey) return " ↕";
    return order === "asc" ? " ↑" : " ↓";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div>
      <div className="ui-card">
        <div className="card-header">
          <div>
            <h1 className="card-title">Customer Feedback & Ratings</h1>
            <p className="card-subtitle">
              Review who has rated your store, check scores, and observe review dates.
            </p>
          </div>
        </div>

        <ErrorMessage message={errorMessage} onDismiss={() => setErrorMessage("")} />

        {loading ? (
          <Loading message="Loading customer reviews..." />
        ) : ratings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">⭐</div>
            <div className="empty-title">No customer ratings yet</div>
            <div className="empty-text">
              When customers rate your store on StoreRate, their reviews will appear here.
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="ui-table">
              <thead>
                <tr>
                  <th className="sortable" onClick={() => handleSort("userName")}>
                    Customer Name{renderSortArrow("userName")}
                  </th>
                  <th className="sortable" onClick={() => handleSort("email")}>
                    Customer Email{renderSortArrow("email")}
                  </th>
                  <th className="sortable" onClick={() => handleSort("rating")}>
                    Rating Given{renderSortArrow("rating")}
                  </th>
                  <th className="sortable" onClick={() => handleSort("date")}>
                    Date Submitted{renderSortArrow("date")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {ratings.map((item) => (
                  <tr key={item.id || item._id}>
                    <td style={{ fontWeight: "600", color: "#111827" }}>
                      👤 {item.userName}
                    </td>
                    <td>{item.userEmail}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <RatingStars value={item.rating} readOnly size={16} />
                        <span style={{ fontWeight: "700", color: "#1f2937" }}>
                          {item.rating} / 5
                        </span>
                      </div>
                    </td>
                    <td style={{ color: "#6b7280", fontSize: "13px" }}>
                      {formatDate(item.date || item.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default OwnerRatings;
