import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

function Navbar({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        {/* Mobile menu toggle */}
        <button
          type="button"
          className="menu-toggle-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

        <Link to="/" className="navbar-brand">
          <span className="brand-badge">★</span>
          <span>StoreRate</span>
        </Link>
      </div>

      <div className="navbar-right">
        {user && (
          <div className="user-info">
            <span className="user-name" title={user.name}>
              {user.name}
            </span>
            <span className={`role-badge ${user.role || ""}`}>
              {user.role}
            </span>
          </div>
        )}

        <button
          type="button"
          className="btn-logout"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
