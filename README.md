# ShopEZ E-Commerce Application

A modern, high-performance E-commerce platform built with the MERN (MongoDB, Express, React, Node.js) stack, featuring a premium glassmorphic UI and comprehensive shopping features.

## 🚀 Features

- **Premium UI**: Modern glassmorphism-based design inspired by major platforms like Ajio and Flipkart.
- **Dynamic Navigation**: Responsive search and categorized browsing.
- **Product Management**: Full admin dashboard for managing products, categories, and banners.
- **Shopping Cart**: Seamless add-to-cart, quantity adjustments, and persistent storage.
- **Wishlist**: Save favorite items for later.
- **Order Management**: Track orders, view history, and cancel orders effortlessly.
- **Secure Auth**: JWT-based authentication with separate user and admin roles.

## 🛠️ Technology Stack

### Frontend
- **Framework**: React.js with Vite
- **Styling**: Vanilla CSS (Modern design patterns)
- **Routing**: React Router DOM
- **HTTP Client**: Axios

### Backend
- **Server**: Node.js & Express
- **Database**: MongoDB (via Mongoose)
- **Security**: Bcryptjs for password hashing, JWT for session management
- **Development**: Environment variables managed via Dotenv

## 📂 Project Structure

```text
├── client/          # Frontend React application
│   ├── src/         # Application source code
│   └── index.html   # Main entry point
├── server/          # Backend Express server
│   ├── models/      # Database schemas
│   ├── routes/      # API endpoints
│   ├── controllers/ # Logic handlers
│   └── index.js     # Server entry point
└── README.md        # Project documentation
```

## ⚙️ Setup & Installation

### 1. Prerequisites
- Node.js (v16.x or higher)
- npm or yarn
- MongoDB (Local instance or Atlas)

### 2. Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Create a `.env` file in the `server` directory and add your credentials:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Seed Initial Data (Optional):
   ```bash
   npm run seed
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📜 Key Scripts

### Server
- `npm start`: Runs the server in production mode.
- `npm run dev`: Runs the server in watch mode using `--watch`.
- `npm run seed`: Populates the database with initial product data.

### Client
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the application for production.
- `npm run preview`: Previews the production build locally.

---
*Built with ❤️ by the ShopEZ Team*
