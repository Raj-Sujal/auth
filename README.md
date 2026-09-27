# Authentication & Product CRUD REST API

A secure RESTful API built with **Node.js**, **Express**, **MongoDB**, **JWT (Access + Refresh Tokens)**, and **express-validator**, alongside a modern **React** single-page frontend.

---

## 🌟 Key Features

- 🔐 **JWT Authentication & Token Lifecycle**
  - **Access Tokens**: Short-lived (15 minutes), passed via `Authorization: Bearer <token>` header.
  - **Refresh Tokens**: Long-lived (7 days), stored in `httpOnly`, `secure` cookies for revocation & token rotation.
  - **Auto-Refresh**: Frontend Axios interceptor transparently refreshes expired access tokens without interrupting the user session.
  - **Password Security**: Hashing with `bcryptjs` (min 10 salt rounds), passwords never stored in plain text or returned in JSON responses.

- 🛍️ **Product CRUD API**
  - Full Create, Read, Update, Delete capabilities.
  - Write operations (`POST`, `PUT`, `DELETE`) protected by `authenticate` middleware.
  - Database-backed existence checks before performing update or delete actions.
  - Pagination, search keyword matching, and category filtering.

- ✅ **Strict Request Validation**
  - All input endpoints validated using `express-validator`.
  - Field-level validation for auth inputs (`name`, `email`, `password`, matching `confirmPassword`).
  - Strict type checking for product properties (`price`, `stock`, `category`).
  - Route param validation (`:id` confirmed as valid MongoDB ObjectId).
  - Returns clear `400 Bad Request` field-level error messages.

- 🎨 **Modern React Frontend**
  - Built using React (Vite), Tailwind CSS, and Lucide Icons.
  - Auth pages (Login & Register) with real-time error messages.
  - Dynamic Product catalog, Add/Edit modal dialogs, and delete actions.

---

## 🚀 Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, `express-validator`, `cookie-parser`, `express-rate-limit`.
- **Frontend**: React, Vite, Axios, Tailwind CSS, Lucide React, React Router v6.

---

## 📁 Project Structure

```text
├── server/
│   ├── config/
│   │   └── db.js               # MongoDB connection setup
│   ├── controllers/
│   │   ├── authController.js   # Auth endpoints logic
│   │   └── productController.js# Product CRUD logic
│   ├── middleware/
│   │   ├── authMiddleware.js   # Bearer JWT verification
│   │   └── validateMiddleware.js# express-validator error formatter
│   ├── models/
│   │   ├── User.js             # Mongoose User schema (refresh tokens array)
│   │   └── Product.js          # Mongoose Product schema
│   ├── routes/
│   │   ├── authRoutes.js       # Auth API routes & rate limiter
│   │   └── productRoutes.js    # Product API routes
│   ├── validators/
│   │   ├── authValidator.js    # Register & login validation chains
│   │   └── productValidator.js # Product input & ID validation chains
│   └── index.js                # Express app entry point
├── client/
│   ├── src/
│   │   ├── api/axios.js        # Axios instance with token refresh interceptor
│   │   ├── context/AuthContext.jsx # Auth state management provider
│   │   ├── components/         # Navbar, ProductCard, ProductModal, ProtectedRoute
│   │   ├── pages/              # Products, Login, Register, NotFound
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
├── .env.example
├── README.md
└── package.json
```

---

## 🛠️ Environment Variables Setup

Create a `.env` file inside the `server/` directory (or use `.env.example` as a template):

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/ecommerce_db
ACCESS_TOKEN_SECRET=your_super_secret_access_token_key_here
REFRESH_TOKEN_SECRET=your_super_secret_refresh_token_key_here
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

---

## ⚙️ Installation & Running Locally

### 1. Install Dependencies
Run the install command from the project root:
```bash
npm run install:all
```
*(Or navigate to both `server` and `client` folders and run `npm install` individually)*

### 2. Start Development Servers
To run both backend server and frontend client concurrently:
```bash
npm run dev
```

Alternatively, start them separately:
- **Backend**: `npm run dev:server` (Runs on `http://localhost:5000`)
- **Frontend**: `npm run dev:client` (Runs on `http://localhost:5173`)

---

## 📡 API Endpoints Reference

### 🔐 Authentication APIs (`/api/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register a new user (`name`, `email`, `password`, `confirmPassword`) |
| `POST` | `/api/auth/login` | Public | Authenticate user; returns `accessToken` in JSON & sets `refreshToken` in httpOnly cookie |
| `POST` | `/api/auth/refresh-token` | Public* | Issue brand-new access token (and rotate refresh token) using cookie |
| `POST` | `/api/auth/logout` | Authenticated | Revoke refresh token in database & clear httpOnly cookie |
| `GET` | `/api/auth/me` | Authenticated | Return logged-in user profile |

*\*Requires valid refresh token cookie*

### 📦 Product CRUD APIs (`/api/products`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/products` | Authenticated | Create a new product (`name`, `description`, `price`, `category`, `stock`) |
| `GET` | `/api/products` | Public | List products (Supports `?page=1&limit=10&search=keyword&category=cat`) |
| `GET` | `/api/products/:id` | Public | Get single product details by MongoDB ObjectId |
| `PUT` | `/api/products/:id` | Authenticated | Update an existing product |
| `DELETE` | `/api/products/:id` | Authenticated | Delete a product by ID |

---

## 🛡️ Validation & Error Response Format

When validation fails on any endpoint, a standardized `400 Bad Request` payload is returned:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please enter a valid email address"
    },
    {
      "field": "confirmPassword",
      "message": "Passwords do not match"
    }
  ]
}
```

---

## 🧪 Testing the APIs

You can test endpoints using **Postman**, **cURL**, or via the included React frontend.

1. **Register**: `POST /api/auth/register`
   - Body: `{"name":"John Doe","email":"john@example.com","password":"password123","confirmPassword":"password123"}`
2. **Login**: `POST /api/auth/login`
   - Body: `{"email":"john@example.com","password":"password123"}`
   - Save the returned `accessToken` for Bearer auth headers in subsequent write requests.
