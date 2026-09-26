# StoreRate - Full Stack Store Rating Web Application

A full-stack web application that allows customers to discover, search, and rate stores, store owners to monitor customer feedback, and system administrators to manage users, stores, and platform analytics.

---

## 🌟 Tech Stack

- **Frontend**: React.js 19, Vite, React Router DOM v7, Axios, Pure CSS (Responsive Flexbox & CSS Grid)
- **Backend**: Node.js, Express.js (ES Modules), JWT (`jsonwebtoken`), Password Hashing (`bcryptjs`), CORS
- **Database**: MongoDB with Mongoose ODM
- **Architecture**: REST API with JWT-based Role-Based Access Control (RBAC)

---

## 👥 User Roles & Permissions

1. **Normal User (`user`)**:
   - Register a customer account
   - Log in & log out
   - Browse store listings with live search by name and address
   - Sort stores by name, address, or overall rating
   - Submit a 1–5 star rating for any store
   - Update their submitted rating anytime (one rating per store limit)
   - Change account password
2. **Store Owner (`owner`)**:
   - Log in & log out
   - View assigned store details and real-time average rating & total reviews count
   - View all customer ratings (customer name, customer email, rating, timestamp)
   - Sort ratings by customer name, email, score, or date
   - Change account password
3. **System Administrator (`admin`)**:
   - Access real-time administrative metrics (Total Users, Total Stores, Total Ratings)
   - View user accounts directory with multi-field search and column sorting
   - Inspect individual user profiles and their assigned stores
   - Create new users with any role (`admin`, `owner`, `user`)
   - View registered stores with assigned owner info and average ratings
   - Create new stores and assign them to registered store owners
   - Change administrator password

---

## 📁 Project Structure

```text
StoreRate/
├── backend/
│   ├── .env.example              # Template environment variables for backend
│   ├── package.json              # Node dependencies (express, mongoose, bcryptjs, etc.)
│   ├── server.js                 # Express server entry point & route mounting
│   └── src/
│       ├── config/
│       │   └── db.js             # MongoDB connection logic
│       ├── Controllers/
│       │   ├── adminController.js# Admin dashboard, users, and store management
│       │   ├── authController.js # Register and login handlers
│       │   ├── ownerController.js# Owner dashboard & ratings table
│       │   ├── ratingController.js# Rating submission & update logic
│       │   ├── storeController.js # Public store browsing & average ratings
│       │   └── userController.js  # Password update handler
│       ├── middlewares/
│       │   ├── authMiddleware.js # 'protect' middleware (JWT verification)
│       │   └── roleMiddleware.js # 'allowRoles' middleware (RBAC)
│       ├── models/
│       │   ├── Rating.js         # Rating schema with compound unique index (user + store)
│       │   ├── Store.js          # Store schema with owner reference
│       │   └── User.js           # User schema (name, email, password, address, role)
│       └── routes/
│           ├── adminRoutes.js    # /api/admin
│           ├── authRoute.js      # /api/auth
│           ├── ownerRoutes.js    # /api/owner
│           ├── ratingRoutes.js   # /api/ratings
│           ├── storeRoutes.js    # /api/stores
│           └── userRoutes.js     # /api/users
└── frontend/
    ├── .env.example              # Template environment variables for frontend
    ├── package.json              # React 19, Vite, react-router-dom, axios
    ├── vite.config.js
    └── src/
        ├── App.jsx               # Application routes (Public, Protected, Role-based)
        ├── main.jsx              # Mounts AuthProvider & React DOM root
        ├── index.css             # Base styles, typography, and reset
        ├── context/
        │   └── AuthContext.jsx   # Global auth state (user, token, login, logout)
        ├── services/
        │   └── api.js            # Axios client with JWT request & 401/403 response interceptors
        ├── components/
        │   ├── ProtectedRoute.jsx# Auth gate (redirects to /login if unauthenticated)
        │   ├── RoleRoute.jsx     # Authorization gate (redirects to /unauthorized if wrong role)
        │   ├── common/
        │   │   ├── Common.css    # Universal styling for tables, cards, filters, and badges
        │   │   ├── Loading.jsx   # Loading spinner component
        │   │   ├── ErrorMessage.jsx # Error banner component
        │   │   ├── SuccessMessage.jsx # Success banner component
        │   │   └── RatingStars.jsx# Interactive & display star rating widget
        │   └── layout/
        │       ├── MainLayout.jsx# Reusable layout wrapper with header and sidebar
        │       ├── MainLayout.css# Responsive drawer & desktop layout styles
        │       ├── Navbar.jsx    # Top header with user profile & logout
        │       └── Sidebar.jsx   # Role-adaptive sidebar navigation
        └── pages/
            ├── Login.jsx         # Universal login page
            ├── Register.jsx      # Normal user registration page
            ├── Unauthorized.jsx  # 403 Access Denied page
            ├── common/
            │   └── ChangePassword.jsx # Shared password update page
            ├── user/
            │   ├── UserDashboard.jsx # Normal user dashboard
            │   └── UserStores.jsx    # Store browsing, searching, and rating interface
            ├── admin/
            │   ├── AdminDashboard.jsx# Analytics and statistics cards
            │   ├── AdminUsers.jsx    # User directory with filters & sort
            │   ├── AdminCreateUser.jsx # Admin user creation form
            │   ├── AdminUserDetails.jsx # Detailed user & store inspector
            │   ├── AdminStores.jsx   # Store directory with owner info & sorting
            │   └── AdminCreateStore.jsx# Store creation with owner dropdown
            └── owner/
                ├── OwnerDashboard.jsx# Store owner stats & reputation overview
                └── OwnerRatings.jsx  # Customer reviews list with sorting
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB running locally (default: `mongodb://127.0.0.1:27017/store_rating`) or a MongoDB Atlas connection string.

---

### Step 1: Backend Setup

1. Open a terminal and navigate to `backend/`:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - In `.env`, ensure the following are configured:
     ```env
     PORT=5000
     MONGODB_URI=mongodb://127.0.0.1:27017/store_rating
     JWT_SECRET=supersecretjwtkey_storerate_2026
     ```
4. Start the backend development server:
   ```bash
   npm run dev
   # or
   npm start
   ```
   The backend will start at `http://localhost:5000`.

---

### Step 2: Frontend Setup

1. Open a new terminal and navigate to `frontend/`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Verify `VITE_API_URL`:
     ```env
     VITE_API_URL=http://localhost:5000/api
     ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## 🔑 How to Create Initial Admin / Owner Accounts

By default, the registration page (`/register`) creates accounts with the role `"user"`.

To create an initial Administrator or Store Owner:

1. **Option A: Register via API or Seed Script**:
   Send a `POST` request to `http://localhost:5000/api/auth/register` or create an account from MongoDB Compass/Mongo Shell by updating `role: "admin"`.
2. **Option B: Once logged in as an Admin**:
   Navigate to **Users** → **+ Create New User** (`/admin/users/create`) and pick the role **System Administrator** or **Store Owner** directly from the dropdown.

---

## 🛠️ API Reference Overview

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Public | Server health check |
| `POST` | `/api/auth/register` | Public | Register a normal user |
| `POST` | `/api/auth/login` | Public | Login with email and password |
| `PUT` | `/api/users/update-password` | Protected | Change password for logged-in user |
| `GET` | `/api/stores` | Protected | Browse stores (with live search & user's submitted rating) |
| `POST` | `/api/ratings` | Protected (User) | Submit or update 1–5 star rating |
| `GET` | `/api/admin/dashboard` | Protected (Admin) | Retrieve total users, stores, and ratings counts |
| `GET` | `/api/admin/users` | Protected (Admin) | List users with multi-column filters & sorting |
| `POST` | `/api/admin/users` | Protected (Admin) | Create user with chosen role |
| `GET` | `/api/admin/users/:id` | Protected (Admin) | View user details + store owner info |
| `GET` | `/api/admin/stores` | Protected (Admin) | List stores with owner details & ratings |
| `POST` | `/api/admin/stores` | Protected (Admin) | Create store & link to owner |
| `GET` | `/api/owner/dashboard` | Protected (Owner) | View owner store stats and average rating |
| `GET` | `/api/owner/ratings` | Protected (Owner) | View all customer ratings for owner's store |

---

## 🚢 Deployment Notes

### Frontend (e.g. Vercel, Netlify)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variable**: `VITE_API_URL=https://your-backend-domain.com/api`

### Backend (e.g. Render, Railway)
- **Build / Start Command**: `npm start`
- **Environment Variables**:
  - `PORT=5000` (or host provided port)
  - `MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.../store_rating`
  - `JWT_SECRET=your_production_jwt_secret_key`
