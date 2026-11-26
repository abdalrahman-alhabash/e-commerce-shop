# 🛒 E-Commerce Shop

A responsive front-end e-commerce web application built with **React**, **Vite**, and **React Router**, featuring dynamic product browsing, search and filtering, persistent cart and favorites, role-based access control, and a checkout flow.

---

## ✨ Key Features

- **Product Catalog & Details:** Browse products fetched from DummyJSON alongside custom products, with skeleton loading states and a dedicated product details view (`/product/:id`).
- **Search, Filtering, Sorting & Pagination:** Filter products by category, search by title, sort by price or name, and navigate across pages smoothly.
- **Shopping Cart & Favorites:** Add, remove, and adjust item quantities in the cart with live totals, plus toggle favorite items with `localStorage` persistence.
- **Role-Based Access & Protected Routes:** Separate user and admin login flows (`ProtectedRoute` and `AdminRoute`) with session handling and cart cleanup on logout.
- **Admin Product Creation:** Authorized admins can add new products via form submission, sync with the API, and persist custom items locally.
- **Checkout Flow:** Shipping details form, order summary, and order confirmation state.

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite
- **Routing:** React Router DOM
- **State Management:** React Context API (`AuthContext`, `CartContext`, `FavoriteContext`, `ProductContext`) + `localStorage`
- **Data Fetching & UI:** Axios, React Hot Toast, React Icons, CSS3

---

## 📂 Project Structure

```text
src/
├── components/      # Navbar, ProductCard, ProductCardSkeleton, ProtectedRoute, AdminRoute
├── context/         # AuthContext, CartContext, FavoriteContext, ProductContext
├── pages/           # Home, ProductDetails, Cart, Checkout, Favorite, Login, AdminLogin, AddProduct
├── App.jsx          # Main routing, Toaster, and layout setup
└── main.jsx         # Application entry point and context providers
```

---

## 🌐 Data Source

Product catalog and sample item data are fetched from the DummyJSON REST API (no API key required; an active internet connection is needed to load initial API products).

---

## 🚀 Getting Started

git clone [https://github.com/abdalrahman-alhabash/e-commerce-shop.git](https://github.com/abdalrahman-alhabash/e-commerce-shop.git)

npm install

npm run dev

---

## 👨‍💻 Author
Abdalrahman Alhabash

GitHub: @abdalrahman-alhabash