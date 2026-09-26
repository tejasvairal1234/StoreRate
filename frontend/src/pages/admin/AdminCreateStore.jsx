import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import SuccessMessage from "../../components/common/SuccessMessage.jsx";
import Loading from "../../components/common/Loading.jsx";
import "../../components/common/Common.css";

function AdminCreateStore() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    owner: "",
  });

  const [owners, setOwners] = useState([]);
  const [loadingOwners, setLoadingOwners] = useState(true);
  const [fieldErrors, setFieldErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // Load available store owners for the dropdown
  useEffect(() => {
    const fetchOwners = async () => {
      setLoadingOwners(true);
      try {
        const response = await api.get("/admin/users", {
          params: { role: "owner" },
        });
        setOwners(response.data || []);
      } catch (error) {
        setErrorMessage(
          "Failed to load store owners. Please create an owner user first."
        );
      } finally {
        setLoadingOwners(false);
      }
    };

    fetchOwners();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const errors = {};
    const { name, email, address, owner } = formData;

    if (!name.trim()) errors.name = "Store name is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = "Store email is required.";
    } else if (!emailRegex.test(email.trim())) {
      errors.email = "Please enter a valid store email address.";
    }

    if (!address.trim()) {
      errors.address = "Store address is required.";
    } else if (address.trim().length > 400) {
      errors.address = "Address must not exceed 400 characters.";
    }

    if (!owner) {
      errors.owner = "Please select a store owner.";
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
      const response = await api.post("/admin/stores", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        owner: formData.owner,
      });

      setSuccessMessage(
        response.data?.message || "Store created successfully! Redirecting..."
      );

      setTimeout(() => {
        navigate("/admin/stores");
      }, 1200);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to create store. Please check the provided information."
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
            <h1 className="card-title">Add New Store</h1>
            <p className="card-subtitle">
              Register a business location and assign an authorized store owner.
            </p>
          </div>
          <Link to="/admin/stores" className="btn btn-secondary btn-sm">
            ← Back to Stores
          </Link>
        </div>

        <ErrorMessage message={errorMessage} onDismiss={() => setErrorMessage("")} />
        <SuccessMessage message={successMessage} onDismiss={() => setSuccessMessage("")} />

        {loadingOwners ? (
          <Loading message="Loading store owners..." />
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label htmlFor="name" style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>
                Store Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="filter-input"
                style={{ width: "100%", boxSizing: "border-box" }}
                placeholder="e.g. Downtown Organic Market"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {fieldErrors.name && (
                <span style={{ color: "#dc2626", fontSize: "13px" }}>{fieldErrors.name}</span>
              )}
            </div>

            <div>
              <label htmlFor="email" style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>
                Store Contact Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="filter-input"
                style={{ width: "100%", boxSizing: "border-box" }}
                placeholder="contact@market.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {fieldErrors.email && (
                <span style={{ color: "#dc2626", fontSize: "13px" }}>{fieldErrors.email}</span>
              )}
            </div>

            <div>
              <label htmlFor="owner" style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>
                Store Owner (User with role "owner")
              </label>
              {owners.length === 0 ? (
                <div style={{ padding: "10px 14px", backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "6px", color: "#b91c1c", fontSize: "13px" }}>
                  No store owner accounts found.{" "}
                  <Link to="/admin/users/create" style={{ color: "#2563eb", fontWeight: "600" }}>
                    Create an owner user first
                  </Link>
                  .
                </div>
              ) : (
                <select
                  id="owner"
                  name="owner"
                  className="filter-select"
                  style={{ width: "100%", boxSizing: "border-box" }}
                  value={formData.owner}
                  onChange={handleChange}
                  disabled={isSubmitting}
                >
                  <option value="">-- Select Store Owner --</option>
                  {owners.map((owner) => (
                    <option key={owner._id || owner.id} value={owner._id || owner.id}>
                      {owner.name} ({owner.email})
                    </option>
                  ))}
                </select>
              )}
              {fieldErrors.owner && (
                <span style={{ color: "#dc2626", fontSize: "13px" }}>{fieldErrors.owner}</span>
              )}
            </div>

            <div>
              <label htmlFor="address" style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>
                Physical Address
              </label>
              <textarea
                id="address"
                name="address"
                className="filter-input"
                style={{ width: "100%", boxSizing: "border-box", minHeight: "80px", resize: "vertical", fontFamily: "inherit" }}
                placeholder="Enter store street address, city, and zip"
                value={formData.address}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {fieldErrors.address && (
                <span style={{ color: "#dc2626", fontSize: "13px" }}>{fieldErrors.address}</span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || owners.length === 0}
              style={{ marginTop: "8px", padding: "11px" }}
            >
              {isSubmitting ? "Creating Store..." : "Create Store"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AdminCreateStore;
