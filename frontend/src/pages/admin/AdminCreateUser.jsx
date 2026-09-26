import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import SuccessMessage from "../../components/common/SuccessMessage.jsx";
import "../../components/common/Common.css";

function AdminCreateUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "user",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const errors = {};
    const { name, email, password, address, role } = formData;

    if (!name.trim()) {
      errors.name = "Name is required.";
    } else if (name.trim().length < 20) {
      errors.name = "Name must be at least 20 characters.";
    } else if (name.trim().length > 60) {
      errors.name = "Name must not exceed 60 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/;
    if (!password) {
      errors.password = "Password is required.";
    } else if (!passwordRegex.test(password)) {
      errors.password =
        "Password must be 8-16 characters and contain an uppercase letter and a special character.";
    }

    if (!address.trim()) {
      errors.address = "Address is required.";
    } else if (address.trim().length > 400) {
      errors.address = "Address must not exceed 400 characters.";
    }

    if (!["admin", "user", "owner"].includes(role)) {
      errors.role = "Please select a valid role.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await api.post("/admin/users", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        address: formData.address.trim(),
        role: formData.role,
      });

      setSuccessMessage(
        response.data?.message || "User created successfully! Redirecting..."
      );

      setTimeout(() => {
        navigate("/admin/users");
      }, 1200);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to create user account."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto" }}>
      <div className="ui-card">
        <div className="card-header">
          <div>
            <h1 className="card-title">Add New User</h1>
            <p className="card-subtitle">
              Register an administrator, store owner, or normal customer.
            </p>
          </div>
          <Link to="/admin/users" className="btn btn-secondary btn-sm">
            ← Back to Users
          </Link>
        </div>

        <ErrorMessage message={errorMessage} onDismiss={() => setErrorMessage("")} />
        <SuccessMessage message={successMessage} onDismiss={() => setSuccessMessage("")} />

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label htmlFor="name" style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="filter-input"
              style={{ width: "100%", boxSizing: "border-box" }}
              placeholder="e.g. Christopher Alexander Davis"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {fieldErrors.name ? (
              <span style={{ color: "#dc2626", fontSize: "13px" }}>{fieldErrors.name}</span>
            ) : (
              <span style={{ color: "#6b7280", fontSize: "12px" }}>Must be 20 to 60 characters</span>
            )}
          </div>

          <div>
            <label htmlFor="email" style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="filter-input"
              style={{ width: "100%", boxSizing: "border-box" }}
              placeholder="user@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {fieldErrors.email && (
              <span style={{ color: "#dc2626", fontSize: "13px" }}>{fieldErrors.email}</span>
            )}
          </div>

          <div>
            <label htmlFor="role" style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>
              Account Role
            </label>
            <select
              id="role"
              name="role"
              className="filter-select"
              style={{ width: "100%", boxSizing: "border-box" }}
              value={formData.role}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="user">Normal User (Customer)</option>
              <option value="owner">Store Owner</option>
              <option value="admin">System Administrator</option>
            </select>
            {fieldErrors.role && (
              <span style={{ color: "#dc2626", fontSize: "13px" }}>{fieldErrors.role}</span>
            )}
          </div>

          <div>
            <label htmlFor="password" style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>
              Initial Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="filter-input"
              style={{ width: "100%", boxSizing: "border-box" }}
              placeholder="8-16 chars, 1 uppercase, 1 special char"
              value={formData.password}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {fieldErrors.password ? (
              <span style={{ color: "#dc2626", fontSize: "13px" }}>{fieldErrors.password}</span>
            ) : (
              <span style={{ color: "#6b7280", fontSize: "12px" }}>
                8–16 characters with at least one uppercase letter & one special character.
              </span>
            )}
          </div>

          <div>
            <label htmlFor="address" style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>
              Address
            </label>
            <textarea
              id="address"
              name="address"
              className="filter-input"
              style={{ width: "100%", boxSizing: "border-box", minHeight: "80px", resize: "vertical", fontFamily: "inherit" }}
              placeholder="Enter full physical address"
              value={formData.address}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {fieldErrors.address ? (
              <span style={{ color: "#dc2626", fontSize: "13px" }}>{fieldErrors.address}</span>
            ) : (
              <span style={{ color: "#6b7280", fontSize: "12px" }}>Maximum 400 characters</span>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
            style={{ marginTop: "8px", padding: "11px" }}
          >
            {isSubmitting ? "Creating User..." : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminCreateUser;
