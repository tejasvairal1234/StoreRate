import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import "./MainLayout.css";

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="main-layout-root">
      <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
      <div className="main-layout-body">
        {/* Backdrop for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="sidebar-backdrop"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Dynamic Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Page Content */}
        <main className="main-content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
