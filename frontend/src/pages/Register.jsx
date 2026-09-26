import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // Handle input changes and clear field-specific error as user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form fields based on backend requirements
  const validateForm = () => {
    const errors = {};
    const { name, email, address, password, confirmPassword } = formData;

    // 1. Name validation (20 - 60 characters)
    if (!name.trim()) {
      errors.name = "Name is required.";
    } else if (name.trim().length < 20) {
      errors.name = "Name must be at least 20 characters.";
    } else if (name.trim().length > 60) {
      errors.name = "Name must not exceed 60 characters.";
    }

    // 2. Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    // 3. Address validation (max 400 characters)
    if (!address.trim()) {
      errors.address = "Address is required.";
    } else if (address.trim().length > 400) {
      errors.address = "Address must not exceed 400 characters.";
    }

    // 4. Password validation (8-16 chars, 1 uppercase, 1 special character)
    const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/;
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8 || password.length > 16) {
      errors.password = "Password must be 8 to 16 characters long.";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Password must contain at least one uppercase letter.";
    } else if (!/[^A-Za-z0-9]/.test(password)) {
      errors.password = "Password must contain at least one special character.";
    } else if (!passwordRegex.test(password)) {
      errors.password =
        "Password must be 8-16 characters and include an uppercase letter and a special character.";
    }

    // 5. Confirm Password validation
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit registration form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");
    setSuccessMessage("");

    // Validate inputs
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send registration payload to backend
      const response = await api.post("/auth/register", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        password: formData.password,
      });

      // Display success message
      setSuccessMessage(
        response.data?.message || "Registration successful! Redirecting to login..."
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        address: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to login page after 1.5 seconds (do not store token or auto-login)
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";

      if (message.toLowerCase().includes("email already")) {
        setFieldErrors((prev) => ({
          ...prev,
          email: "This email is already registered.",
        }));
      } else {
        setGeneralError(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <h1 className="register-title">Create Account</h1>
          <p className="register-subtitle">Sign up as a normal user to rate stores</p>
        </div>

        {generalError && (
          <div className="register-error" role="alert">
            {generalError}
          </div>
        )}

        {successMessage && (
          <div className="register-success" role="alert">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="register-form" noValidate>
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className={`form-input ${fieldErrors.name ? "input-error" : ""}`}
              placeholder="e.g. Alexander Jonathan Montgomery"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {fieldErrors.name ? (
              <span className="field-error">{fieldErrors.name}</span>
            ) : (
              <span className="field-hint">Must be 20 to 60 characters</span>
            )}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`form-input ${fieldErrors.email ? "input-error" : ""}`}
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              autoComplete="email"
            />
            {fieldErrors.email && (
              <span className="field-error">{fieldErrors.email}</span>
            )}
          </div>

          {/* Address Field */}
          <div className="form-group">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              className={`form-textarea ${fieldErrors.address ? "input-error" : ""}`}
              placeholder="Enter your full street address (max 400 characters)"
              value={formData.address}
              onChange={handleChange}
              disabled={isSubmitting}
              rows={3}
            />
            {fieldErrors.address ? (
              <span className="field-error">{fieldErrors.address}</span>
            ) : (
              <span className="field-hint">Maximum 400 characters</span>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className={`form-input ${fieldErrors.password ? "input-error" : ""}`}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              disabled={isSubmitting}
              autoComplete="new-password"
            />
            {fieldErrors.password ? (
              <span className="field-error">{fieldErrors.password}</span>
            ) : (
              <span className="field-hint">
                8-16 chars, at least 1 uppercase & 1 special character
              </span>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className={`form-input ${fieldErrors.confirmPassword ? "input-error" : ""}`}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isSubmitting}
              autoComplete="new-password"
            />
            {fieldErrors.confirmPassword && (
              <span className="field-error">{fieldErrors.confirmPassword}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="login-prompt">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
