# 🥗 Foodie App

Foodie is a full-stack web application where users can explore and order items like fruits and vegetables. It supports user and admin roles, with features like cart management, orders tracking, and category-based filtering.

---

## 📂 Source Code

The project is organized into two main directories:


- **Frontend:** Built with React
- **Backend:** Node.js, Express.js
- **Database:** Neon 

---

## 🛠️ Tech Stack

- **Frontend:** React, React Router, CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (via Neon)

- **Authentication:** JSON Web Tokens (JWT)
- **Deployment:** Render (or mention where you hosted it)

## ✨ Features

- User Registration & Login
- Admin Login
- Role-based UI and permissions
- Category & Subcategory filtering
- Add/Remove items from cart
- Place and manage orders
- Admin can update order status


## 🧭 Navigation Overview

### 🏠 Home Page
- Header contains logo on the left, and on the right:
  - `Cart`, `Home`, `Login/Register` if not logged in
  - `Profile` dropdown (with `Orders`, `Logout`) if logged in
- Below header:
  - Left: Fruits and subcategories
  - Right: Vegetables and subcategories
- Clicking a category or subcategory navigates to:


---

### 🛍️ Items Page – `/items/:category/:subcategory`
- Header at top
- Left: Modifiable list of subcategories
- Right: 
- Search bar
- Item list with:
  - Image
  - Quantity
  - Button:
    - `Add to Cart` (for users)
    - `Remove Item` (for admin — deletes from backend)

---

### 🛒 Cart Page
- Header
- Left: List of items added to the cart
- Right: Place Order section
- Users can:
- Delete items from cart
- Place an order

---

### 📦 Orders Page
- Header
- **User View:**
    - See personal orders
    - Delete orders
- **Admin View:**
    - See all orders in a table
    - Delete any order
    - Change order status (e.g., pending, delivered)

---


## 🔐 Authentication & Authorization

The app supports **role-based login** for both users and admin:

- **User**
  - Can **Register** and **Login**
  - After login, sees `Profile` in the header with options: `Orders` and `Logout`
  - Can **add to cart**, **place orders**, and **view/delete own orders**

- **Admin**
  - Has a separate **Login** (no registration)
  - After login, sees `Profile` with access to:
    - **View all orders**
    - **Delete orders**
    - **Change order status**
    - **Remove products**

Authentication state is managed in the frontend to conditionally render options in the header and control access to protected routes.

## 🔐 Admin Credentials

Admin account is pre-configured and cannot be registered through the app.

To access the admin dashboard, use the following credentials:

Email: adminloginone@gmail.com
Password: admin


> ⚠️ These credentials are hardcoded or stored in the database during setup. You can change them manually in the backend seed file or directly in the database.

Ensure this information is kept secure and changed before deploying to production.


## 🔐 Authentication
- Role-based access (User/Admin)
- Logged-in users see profile options
- Admins get additional management features

---

