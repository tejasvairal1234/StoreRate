import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";

// Protected & Role Route Helpers
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RoleRoute from "./components/RoleRoute.jsx";
import MainLayout from "./components/layout/MainLayout.jsx";

// User Pages
import UserDashboard from "./pages/user/UserDashboard.jsx";
import UserStores from "./pages/user/UserStores.jsx";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminCreateUser from "./pages/admin/AdminCreateUser.jsx";
import AdminUserDetails from "./pages/admin/AdminUserDetails.jsx";
import AdminStores from "./pages/admin/AdminStores.jsx";
import AdminCreateStore from "./pages/admin/AdminCreateStore.jsx";

// Owner Pages
import OwnerDashboard from "./pages/owner/OwnerDashboard.jsx";
import OwnerRatings from "./pages/owner/OwnerRatings.jsx";

// Universal Shared Pages
import ChangePassword from "./pages/common/ChangePassword.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Authenticated Protected Routes with MainLayout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            {/* Normal User Routes (Role: user) */}
            <Route element={<RoleRoute allowedRoles={["user"]} />}>
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/stores" element={<UserStores />} />
              <Route path="/user/change-password" element={<ChangePassword />} />
            </Route>

            {/* Administrator Routes (Role: admin) */}
            <Route element={<RoleRoute allowedRoles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/users/create" element={<AdminCreateUser />} />
              <Route path="/admin/users/:id" element={<AdminUserDetails />} />
              <Route path="/admin/stores" element={<AdminStores />} />
              <Route path="/admin/stores/create" element={<AdminCreateStore />} />
              <Route path="/admin/change-password" element={<ChangePassword />} />
            </Route>

            {/* Store Owner Routes (Role: owner) */}
            <Route element={<RoleRoute allowedRoles={["owner"]} />}>
              <Route path="/owner/dashboard" element={<OwnerDashboard />} />
              <Route path="/owner/ratings" element={<OwnerRatings />} />
              <Route path="/owner/change-password" element={<ChangePassword />} />
            </Route>
          </Route>
        </Route>

        {/* Catch-all Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
