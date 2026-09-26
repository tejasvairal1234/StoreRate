import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api.js";
import Loading from "../../components/common/Loading.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import RatingStars from "../../components/common/RatingStars.jsx";
import "../../components/common/Common.css";

function AdminStores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [addressFilter, setAddressFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");

  const fetchStores = useCallback(async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const params = {};
      if (nameFilter.trim()) params.name = nameFilter.trim();
      if (emailFilter.trim()) params.email = emailFilter.trim();
      if (addressFilter.trim()) params.address = addressFilter.trim();
      if (sortBy) params.sortBy = sortBy;
      if (order) params.order = order;

      const response = await api.get("/admin/stores", { params });
      setStores(response.data || []);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to load stores directory."
      );
    } finally {
      setLoading(false);
    }
  }, [nameFilter, emailFilter, addressFilter, sortBy, order]);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  const handleSort = (columnKey) => {
    if (sortBy === columnKey) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(columnKey);
      setOrder("asc");
    }
  };

  const handleClearFilters = () => {
    setNameFilter("");
    setEmailFilter("");
    setAddressFilter("");
    setSortBy("name");
    setOrder("asc");
  };

  const renderSortArrow = (columnKey) => {
    if (sortBy !== columnKey) return " ↕";
    return order === "asc" ? " ↑" : " ↓";
  };

  return (
    <div>
      <div className="ui-card">
        <div className="card-header">
          <div>
            <h1 className="card-title">Store Directory</h1>
            <p className="card-subtitle">
              Manage registered stores, view assigned owners, and track customer rating performance.
            </p>
          </div>
          <Link to="/admin/stores/create" className="btn btn-primary">
            + Create New Store
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <input
            type="text"
            className="filter-input"
            placeholder="Search by store name..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
          <input
            type="text"
            className="filter-input"
            placeholder="Search by email..."
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
          />
          <input
            type="text"
            className="filter-input"
            placeholder="Search by address..."
            value={addressFilter}
            onChange={(e) => setAddressFilter(e.target.value)}
          />

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={fetchStores}
          >
            Search
          </button>

          {(nameFilter || emailFilter || addressFilter || sortBy !== "name" || order !== "asc") && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleClearFilters}
            >
              Clear
            </button>
          )}
        </div>

        <ErrorMessage message={errorMessage} onDismiss={() => setErrorMessage("")} />

        {loading ? (
          <Loading message="Loading stores..." />
        ) : stores.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏬</div>
            <div className="empty-title">No stores found</div>
            <div className="empty-text">Create your first store or modify search filters.</div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="ui-table">
              <thead>
                <tr>
                  <th className="sortable" onClick={() => handleSort("name")}>
                    Store Name{renderSortArrow("name")}
                  </th>
                  <th className="sortable" onClick={() => handleSort("email")}>
                    Email{renderSortArrow("email")}
                  </th>
                  <th className="sortable" onClick={() => handleSort("address")}>
                    Address{renderSortArrow("address")}
                  </th>
                  <th>Assigned Owner</th>
                  <th className="sortable" onClick={() => handleSort("rating")}>
                    Avg Rating{renderSortArrow("rating")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {stores.map((store) => (
                  <tr key={store.id || store._id}>
                    <td style={{ fontWeight: "600", color: "#111827" }}>
                      🏬 {store.name}
                    </td>
                    <td>{store.email}</td>
                    <td style={{ maxWidth: "260px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {store.address}
                    </td>
                    <td>
                      {store.owner ? (
                        <div>
                          <div style={{ fontWeight: "600", color: "#1f2937" }}>
                            {store.owner.name}
                          </div>
                          <div style={{ fontSize: "12px", color: "#6b7280" }}>
                            {store.owner.email}
                          </div>
                        </div>
                      ) : (
                        <span style={{ color: "#9ca3af" }}>Unassigned</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <RatingStars value={store.averageRating || 0} readOnly size={16} />
                        <span style={{ fontWeight: "700", color: "#1f2937" }}>
                          {store.averageRating ? store.averageRating.toFixed(1) : "0.0"}
                        </span>
                        <span style={{ fontSize: "12px", color: "#9ca3af" }}>
                          ({store.totalRatings || 0})
                        </span>
                      </div>
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

export default AdminStores;
