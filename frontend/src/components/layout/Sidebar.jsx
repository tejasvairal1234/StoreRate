import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

function Sidebar({ isOpen, onClose }) {
  const { user } = useAuth();
  const role = user?.role;

  // Define role-specific navigation links
  const getNavLinks = () => {
    switch (role) {
      case "admin":
        return [
          { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
          { name: "Users", path: "/admin/users", icon: "👥" },
          { name: "Stores", path: "/admin/stores", icon: "🏬" },
          { name: "Change Password", path: "/admin/change-password", icon: "🔒" },
        ];
      case "owner":
        return [
          { name: "Dashboard", path: "/owner/dashboard", icon: "📊" },
          { name: "Ratings", path: "/owner/ratings", icon: "⭐" },
          { name: "Change Password", path: "/owner/change-password", icon: "🔒" },
        ];
      case "user":
      default:
        return [
          { name: "Dashboard", path: "/user/dashboard", icon: "📊" },
          { name: "Stores", path: "/user/stores", icon: "🏬" },
          { name: "Change Password", path: "/user/change-password", icon: "🔒" },
        ];
    }
  };

  const links = getNavLinks();

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-title">Menu ({role || "User"})</div>
      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={onClose}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-link-icon">{link.icon}</span>
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
