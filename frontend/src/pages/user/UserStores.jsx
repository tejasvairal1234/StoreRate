import React, { useState, useEffect, useCallback } from "react";
import api from "../../services/api.js";
import Loading from "../../components/common/Loading.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import SuccessMessage from "../../components/common/SuccessMessage.jsx";
import RatingStars from "../../components/common/RatingStars.jsx";
import "../../components/common/Common.css";

function UserStores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Search & Filter state
  const [nameSearch, setNameSearch] = useState("");
  const [addressSearch, setAddressSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");

  // Track pending ratings input for each store: { [storeId]: selectedRatingNumber }
  const [selectedRatings, setSelectedRatings] = useState({});
  const [submittingStoreId, setSubmittingStoreId] = useState(null);

  // Fetch stores from backend
  const fetchStores = useCallback(async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const params = {};
      if (nameSearch.trim()) params.name = nameSearch.trim();
      if (addressSearch.trim()) params.address = addressSearch.trim();
      if (sortBy) params.sortBy = sortBy;
      if (order) params.order = order;

      const response = await api.get("/stores", { params });
      setStores(response.data || []);

      // Initialize selectedRatings with existing user ratings if present
      const initialRatings = {};
      (response.data || []).forEach((store) => {
        if (store.myRating) {
          initialRatings[store.id || store._id] = store.myRating;
        }
      });
      setSelectedRatings((prev) => ({ ...initialRatings, ...prev }));
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to load stores. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [nameSearch, addressSearch, sortBy, order]);

  // Load stores on mount and when sorting changes
  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  // Handle rating selection change for a store
  const handleRatingChange = (storeId, newRating) => {
    setSelectedRatings((prev) => ({
      ...prev,
      [storeId]: newRating,
    }));
  };

  // Submit or update a rating for a store
  const handleSubmitRating = async (storeId) => {
    const ratingValue = selectedRatings[storeId];

    if (!ratingValue || ratingValue < 1 || ratingValue > 5) {
      setErrorMessage("Please select a rating between 1 and 5.");
      return;
    }

    setSubmittingStoreId(storeId);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await api.post("/ratings", {
        storeId,
        rating: Number(ratingValue),
      });

      setSuccessMessage(
        response.data?.message || "Rating saved successfully!"
      );

      // Refresh store list to recalculate overall average and sync myRating
      await fetchStores();
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to submit rating. Please try again."
      );
    } finally {
      setSubmittingStoreId(null);
    }
  };

  // Clear filters
  const handleClearFilters = () => {
    setNameSearch("");
    setAddressSearch("");
    setSortBy("name");
    setOrder("asc");
  };

  return (
    <div>
      <div className="ui-card">
        <div className="card-header">
          <div>
            <h1 className="card-title">Browse & Rate Stores</h1>
            <p className="card-subtitle">
              Discover local stores and share your feedback with a 1 to 5 star rating.
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="filter-bar">
          <input
            type="text"
            className="filter-input"
            placeholder="Search by store name..."
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
            style={{ minWidth: "200px" }}
          />
          <input
            type="text"
            className="filter-input"
            placeholder="Search by address..."
            value={addressSearch}
            onChange={(e) => setAddressSearch(e.target.value)}
            style={{ minWidth: "200px" }}
          />

          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="address">Sort by Address</option>
            <option value="rating">Sort by Overall Rating</option>
          </select>

          <select
            className="filter-select"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="asc">Ascending (A-Z / Low-High)</option>
            <option value="desc">Descending (Z-A / High-Low)</option>
          </select>

          <button
            type="button"
            className="btn btn-primary"
            onClick={fetchStores}
          >
            Search
          </button>

          {(nameSearch || addressSearch || sortBy !== "name" || order !== "asc") && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          )}
        </div>

        <ErrorMessage message={errorMessage} onDismiss={() => setErrorMessage("")} />
        <SuccessMessage message={successMessage} onDismiss={() => setSuccessMessage("")} />

        {/* Stores List */}
        {loading ? (
          <Loading message="Loading stores..." />
        ) : stores.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏬</div>
            <div className="empty-title">No stores found</div>
            <div className="empty-text">
              Try adjusting your search criteria or clear the filters.
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "20px",
            }}
          >
            {stores.map((store) => {
              const storeId = store.id || store._id;
              const hasRated = store.myRating !== null && store.myRating !== undefined;
              const currentInput = selectedRatings[storeId] || store.myRating || 0;
              const isSubmitting = submittingStoreId === storeId;

              return (
                <div
                  key={storeId}
                  className="ui-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    margin: 0,
                    border: hasRated ? "1px solid #bfdbfe" : "1px solid #e5e7eb",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                      <h3 style={{ fontSize: "18px", color: "#111827", margin: "0 0 6px 0", fontWeight: "700" }}>
                        {store.name}
                      </h3>
                      {hasRated && (
                        <span
                          style={{
                            fontSize: "11px",
                            backgroundColor: "#ecfdf5",
                            color: "#065f46",
                            padding: "2px 8px",
                            borderRadius: "9999px",
                            fontWeight: "600",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Rated ✓
                        </span>
                      )}
                    </div>

                    <p style={{ color: "#6b7280", fontSize: "14px", margin: "0 0 14px 0", lineHeight: "1.4" }}>
                      📍 {store.address}
                    </p>

                    {/* Overall Rating Section */}
                    <div
                      style={{
                        padding: "10px 14px",
                        backgroundColor: "#f9fafb",
                        borderRadius: "8px",
                        marginBottom: "16px",
                      }}
                    >
                      <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: "600", textTransform: "uppercase" }}>
                        Overall Community Rating
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                        <RatingStars value={store.averageRating || 0} readOnly size={20} />
                        <span style={{ fontWeight: "700", color: "#1f2937", fontSize: "15px" }}>
                          {store.averageRating ? store.averageRating.toFixed(1) : "0.0"}
                        </span>
                        <span style={{ fontSize: "12px", color: "#9ca3af" }}>
                          ({store.totalRatings || 0} {store.totalRatings === 1 ? "rating" : "ratings"})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* User Rating Action Box */}
                  <div
                    style={{
                      borderTop: "1px solid #f3f4f6",
                      paddingTop: "14px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "13px", fontWeight: "600", color: "#374151" }}>
                        {hasRated ? `My Rating: ${store.myRating} ★` : "Rate this store:"}
                      </span>
                      {/* Interactive Stars */}
                      <RatingStars
                        value={currentInput}
                        onChange={(star) => handleRatingChange(storeId, star)}
                        size={22}
                      />
                    </div>

                    <button
                      type="button"
                      className={`btn ${hasRated ? "btn-secondary" : "btn-primary"}`}
                      disabled={isSubmitting || !currentInput}
                      onClick={() => handleSubmitRating(storeId)}
                      style={{ width: "100%", padding: "9px" }}
                    >
                      {isSubmitting
                        ? "Saving..."
                        : hasRated
                        ? "Update My Rating"
                        : "Submit Rating"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserStores;
