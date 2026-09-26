import React, { useState } from "react";
import api from "../../services/api.js";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import SuccessMessage from "../../components/common/SuccessMessage.jsx";
import "../../components/common/Common.css";

function ChangePassword() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const { oldPassword, newPassword, confirmPassword } = formData;

    // 1. Validate old password
    if (!oldPassword) {
      setErrorMessage("Current password is required.");
      return;
    }

    // 2. Validate new password (8-16 chars, 1 uppercase, 1 special character)
    const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/;
    if (!newPassword) {
      setErrorMessage("New password is required.");
      return;
    }

    if (newPassword.length < 8 || newPassword.length > 16) {
      setErrorMessage("New password must be 8 to 16 characters long.");
      return;
    }

    if (!/[A-Z]/.test(newPassword)) {
      setErrorMessage("New password must contain at least one uppercase letter.");
      return;
    }

    if (!/[^A-Za-z0-9]/.test(newPassword)) {
      setErrorMessage("New password must contain at least one special character.");
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      setErrorMessage(
        "New password must be 8-16 characters and include an uppercase letter and a special character."
      );
      return;
    }

    // 3. Confirm password matching
    if (!confirmPassword) {
      setErrorMessage("Please confirm your new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.put("/users/update-password", {
        oldPassword,
        newPassword,
      });

      setSuccessMessage(
        response.data?.message || "Password updated successfully!"
      );

      // Reset form
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to update password. Please check your current password."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "540px", margin: "0 auto" }}>
      <div className="ui-card">
        <div className="card-header">
          <div>
            <h1 className="card-title">Change Password</h1>
            <p className="card-subtitle">
              Ensure your account is using a strong and secure password.
            </p>
          </div>
        </div>

        <ErrorMessage message={errorMessage} onDismiss={() => setErrorMessage("")} />
        <SuccessMessage message={successMessage} onDismiss={() => setSuccessMessage("")} />

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label
              htmlFor="oldPassword"
              style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}
            >
              Current Password
            </label>
            <input
              id="oldPassword"
              name="oldPassword"
              type="password"
              className="filter-input"
              style={{ width: "100%", boxSizing: "border-box" }}
              placeholder="Enter your existing password"
              value={formData.oldPassword}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}
            >
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              className="filter-input"
              style={{ width: "100%", boxSizing: "border-box" }}
              placeholder="8-16 chars, 1 uppercase, 1 special char"
              value={formData.newPassword}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <span style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px", display: "block" }}>
              Must be 8–16 characters with at least one uppercase letter and one special symbol.
            </span>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}
            >
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="filter-input"
              style={{ width: "100%", boxSizing: "border-box" }}
              placeholder="Re-enter your new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
            style={{ marginTop: "8px", padding: "11px" }}
          >
            {isSubmitting ? "Updating Password..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
