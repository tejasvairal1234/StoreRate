import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api.js";
import Loading from "../../components/common/Loading.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import "../../components/common/Common.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Filter state
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [addressFilter, setAddressFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  // Sort state
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const params = {};
      if (nameFilter.trim()) params.name = nameFilter.trim();
      if (emailFilter.trim()) params.email = emailFilter.trim();
      if (addressFilter.trim()) params.address = addressFilter.trim();
      if (roleFilter) params.role = roleFilter;
      if (sortBy) params.sortBy = sortBy;
      if (order) params.order = order;

      const response = await api.get("/admin/users", { params });
      setUsers(response.data || []);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to load user accounts."
      );
    } finally {
      setLoading(false);
    }
  }, [nameFilter, emailFilter, addressFilter, roleFilter, sortBy, order]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Toggle sort column
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
    setRoleFilter("");
    setSortBy("name");
    setOrder("asc");
  };

  // Sort indicator helper
  const renderSortArrow = (columnKey) => {
    if (sortBy !== columnKey) return " ↕";
    return order === "asc" ? " ↑" : " ↓";
  };

  return (
    <div>
      <div className="ui-card">
        <div className="card-header">
          <div>
            <h1 className="card-title">User Accounts</h1>
            <p className="card-subtitle">
              Manage system administrators, store owners, and registered customers.
            </p>
          </div>
          <Link to="/admin/users/create" className="btn btn-primary">
            + Create New User
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <input
            type="text"
            className="filter-input"
            placeholder="Filter by name..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
          <input
            type="text"
            className="filter-input"
            placeholder="Filter by email..."
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
          />
          <input
            type="text"
            className="filter-input"
            placeholder="Filter by address..."
            value={addressFilter}
            onChange={(e) => setAddressFilter(e.target.value)}
          />

          <select
            className="filter-select"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="owner">Store Owner</option>
            <option value="user">Normal User</option>
          </select>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={fetchUsers}
          >
            Filter
          </button>

          {(nameFilter || emailFilter || addressFilter || roleFilter || sortBy !== "name" || order !== "asc") && (
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
          <Loading message="Loading user directory..." />
        ) : users.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <div className="empty-title">No users found</div>
            <div className="empty-text">Try adjusting or clearing your filters.</div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="ui-table">
              <thead>
                <tr>
                  <th className="sortable" onClick={() => handleSort("name")}>
                    Name{renderSortArrow("name")}
                  </th>
                  <th className="sortable" onClick={() => handleSort("email")}>
                    Email{renderSortArrow("email")}
                  </th>
                  <th className="sortable" onClick={() => handleSort("address")}>
                    Address{renderSortArrow("address")}
                  </th>
                  <th className="sortable" onClick={() => handleSort("role")}>
                    Role{renderSortArrow("role")}
                  </th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item) => (
                  <tr key={item._id || item.id}>
                    <td style={{ fontWeight: "600" }}>{item.name}</td>
                    <td>{item.email}</td>
                    <td style={{ maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.address}
                    </td>
                    <td>
                      <span className={`role-badge ${item.role}`}>{item.role}</span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <Link
                        to={`/admin/users/${item._id || item.id}`}
                        className="btn btn-outline btn-sm"
                      >
                        View Details
                      </Link>
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

export default AdminUsers;
